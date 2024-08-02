const prisma = require("../../../db/prisma");
const crypto = require("crypto");
const transporter = require("../../../utils/emailTransporter");
const sendMemberInvite = require("../../../services/v1/emails/sendMemberInvite");
const limits = require("../../../data/limits");

const getMembers = async (req, res) => {
  try {
    const { userId } = req;
    const { teamId } = req.body;

    const members = await prisma.role.findMany({
      where: { teamId },
      select: {
        role: true,
        isActive: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    const invites = await prisma.invite.findMany({
      where: { teamId },
      include: {
        user: { select: { id: true, email: true, name: true, avatar: true } },
      },
    });

    res.json({ members, invites });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const createInvite = async (req, res) => {
  try {
    const { userId } = req;

    let { teamId, email, role } = req.body;
    email = email.toLowerCase().trim();
    role = role.toUpperCase();

    // verify user is owner
    const isOwner = await prisma.role.findFirst({
      where: { userId, role: "OWNER", teamId },
    });
    if (!isOwner) {
      return res.status(403).json("You do not have permission");
    }

    // get the team
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) return res.status(404).json("Team not found");

    // check if team is allowed to add another seat
    const plan = team.plan.toLowerCase();
    const { seats: allowedSeats } = limits[plan];
    const members = await prisma.role.count({ where: { teamId } });
    const pendingInvites = await prisma.invite.count({ where: { teamId } });
    if (members + pendingInvites >= allowedSeats) {
      return res.status(400).json("Team is at maximum capacity");
    }

    // check if user has an account with the email
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      // check if user is already a member to the team
      const isMember = await prisma.role.findFirst({
        where: { userId: user.id, teamId },
      });
      if (isMember) return res.status(400).json("User is already a member");
    }

    // check if there is already an invite for the user
    const hasInvite = await prisma.invite.findFirst({
      where: { email, teamId },
    });
    if (hasInvite) return res.status(400).json("User already has an invite");

    // create invite token
    let token = crypto.randomBytes(32).toString("hex");
    while (await prisma.invite.findUnique({ where: { token } })) {
      token = crypto.randomBytes(32).toString("hex");
    }

    // make sure role is valid
    const allowedRoles = ["OWNER", "MEMBER", "VIEWER"];
    if (!allowedRoles.includes(role.toUpperCase())) {
      return res.status(400).json("Invalid role");
    }

    // create invite in database
    const invite = await prisma.invite.create({
      data: {
        teamId,
        email,
        role: role.toUpperCase(),
        token,
        userId: user?.id,
      },
    });

    // get all the invites for the team
    const invites = await prisma.invite.findMany({ where: { teamId } });

    res.json({ invites });

    // send invite email
    await sendMemberInvite(email, token, team.name);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const resendInvite = async (req, res) => {
  try {
    const { userId } = req;
    const { inviteId } = req.body;

    // get invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
      include: { team: true },
    });
    if (!invite) return res.status(404).json("Invite not found");

    // verify user has permission
    const isOwner = await prisma.role.findFirst({
      where: { userId, role: "OWNER", teamId: invite.team.id },
    });
    if (!isOwner) return res.status(403).json("You do not have permission");

    // generate new token
    let token = crypto.randomBytes(32).toString("hex");
    while (await prisma.invite.findUnique({ where: { token } })) {
      token = crypto.randomBytes(32).toString("hex");
    }

    // update invite
    const updatedInvite = await prisma.invite.update({
      where: { id: inviteId },
      data: { token },
    });

    // send email
    const sent = await sendMemberInvite(invite.email, token, invite.team.name);
    if (!sent) return res.status(500).json("Failed to send email");

    res.json("Invite has been resent!");
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const revokeInvite = async (req, res) => {
  try {
    const { userId } = req;
    const { inviteId } = req.body;

    // get invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
      include: { team: true },
    });
    if (!invite) return res.status(404).json("Invite not found");

    // verify user has permission
    const isOwner = await prisma.role.findFirst({
      where: { userId, role: "OWNER", teamId: invite.team.id },
    });
    if (!isOwner) return res.status(403).json("You do not have permission");

    // delete invite
    await prisma.invite.delete({ where: { id: inviteId } });

    // get updated invites
    const invites = await prisma.invite.findMany({
      where: { teamId: invite.team.id },
    });

    res.json({ invites });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const acceptInvite = async (req, res) => {};

module.exports = {
  getMembers,
  acceptInvite,
  createInvite,
  resendInvite,
  revokeInvite,
};
