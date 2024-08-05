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
        id: true,
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
        email, // make sure user email matches the invite email
        role: role.toUpperCase(),
        token,
        userId: user?.id, // we only use this to get the user's avatar to show on the invite list
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

    // send email
    const { email, token } = invite;
    const sent = await sendMemberInvite(email, token, invite.team.name);
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

const bulkRevoke = async (req, res) => {
  try {
    const { userId } = req;
    const { invites, teamId } = req.body;

    // verify user has permission
    const isOwner = await prisma.role.findFirst({
      where: { userId, role: "OWNER", teamId },
    });
    if (!isOwner) return res.status(403).json("You do not have permission");

    // delete invites
    await prisma.invite.deleteMany({ where: { id: { in: invites } } });

    // get updated invites
    const newInvites = await prisma.invite.findMany({ where: { teamId } });

    res.json({ invites: newInvites });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const getInvite = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json("Invalid token");

    const invite = await prisma.invite.findUnique({
      where: { token },
      include: { team: { select: { id: true, name: true, avatar: true } } },
    });

    if (!invite) return res.status(404).json("Invite not found");

    const { id: teamId, name, avatar } = invite.team;
    const { id: inviteId } = invite;
    res.json({ invite: { teamId, inviteId, name, avatar } });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const acceptInvite = async (req, res) => {
  try {
    const { userId } = req;
    const { id: inviteId } = req.body;

    // get invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
      include: { user: true, team: true },
    });
    if (!invite) return res.status(404).json("Invite not found");

    // check if there is a user attached to the invite
    // get user by id from access token
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json("User not found");

    // check if user email matches the invite email
    if (user.email !== invite.email) {
      // check if user is attached to the invite
      if (!invite.user || invite.user.id !== userId) {
        return res.status(403).json("Unauthorized");
      }
    }

    // make sure user is not already a member
    const isMember = await prisma.role.findFirst({
      where: { userId, teamId: invite.teamId },
    });
    if (isMember) return res.status(400).json("User is already a member");

    // check if team is allowed to add another seat
    const { team } = invite;
    const { id: teamId } = team;
    const plan = team.plan.toLowerCase();
    const { seats: allowedSeats } = limits[plan];
    const members = await prisma.role.count({ where: { teamId } });
    const pendingInvites = await prisma.invite.count({ where: { teamId } });
    if (members + pendingInvites >= allowedSeats) {
      return res.status(400).json("Team is at maximum capacity");
    }

    // create role for user
    await prisma.role.create({
      data: {
        userId,
        teamId: invite.teamId,
        role: invite.role,
        isActive: true,
      },
    });

    // delete invite
    await prisma.invite.delete({ where: { id: inviteId } });

    // update users default team
    await prisma.user.update({
      where: { id: userId },
      data: { defaultTeamId: invite.teamId },
    });

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const declineInvite = async (req, res) => {
  try {
    const { userId } = req;
    const { id: inviteId } = req.body;

    // get invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
      include: { team: true },
    });
    if (!invite) return res.status(404).json("Invite not found");

    // check if there is a user attached to the invite
    // get user by id from access token
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json("User not found");

    // check if user email matches the invite email
    if (user.email !== invite.email) {
      // check if user is attached to the invite
      if (!invite.user || invite.user.id !== userId) {
        return res.status(403).json("Unauthorized");
      }
    }

    // delete invite
    await prisma.invite.delete({ where: { id: inviteId } });

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const updateRole = async (req, res) => {
  try {
    const { userId } = req;
    const { teamId, roleId, role } = req.body;

    // check if user is owner
    const isOwner = await prisma.role.findFirst({
      where: { userId, role: "OWNER", teamId },
    });
    if (!isOwner) return res.status(403).json("You do not have permission");

    // make sure role is valid
    const allowedRoles = ["OWNER", "MEMBER", "VIEWER"];
    if (!allowedRoles.includes(role.toUpperCase())) {
      return res.status(400).json("Invalid role");
    }

    // update role
    await prisma.role.update({
      where: { id: roleId },
      data: { role: role.toUpperCase() },
    });

    // get updated roles
    const members = await prisma.role.findMany({
      where: { teamId },
      select: {
        id: true,
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

    res.json({ members });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const removeMembers = async (req, res) => {
  try {
    const { userId } = req;
    const { teamId, roleIds } = req.body;

    // maker sure roleIds is an array
    if (!Array.isArray(roleIds)) {
      return res.status(400).json("Invalid role ids");
    }

    // make sure user id is not in roleIds
    if (roleIds.includes(userId)) {
      return res.status(400).json("Cannot remove yourself");
    }

    // check if user is owner
    const isOwner = await prisma.role.findFirst({
      where: { userId, role: "OWNER", teamId },
    });
    if (!isOwner) return res.status(403).json("You do not have permission");

    // delete roles
    await prisma.role.deleteMany({ where: { id: { in: roleIds } } });

    // get updated roles
    const members = await prisma.role.findMany({
      where: { teamId },
      select: {
        id: true,
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

    res.json({ members });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getMembers,
  acceptInvite,
  createInvite,
  resendInvite,
  revokeInvite,
  bulkRevoke,
  getInvite,
  declineInvite,
  updateRole,
  removeMembers,
};
