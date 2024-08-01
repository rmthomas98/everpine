const prisma = require("../../../db/prisma");
const crypto = require("crypto");
const transporter = require("../../../utils/emailTransporter");

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

    const invites = await prisma.invite.findMany({ where: { teamId } });

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

    // send email to invite the user
    const msg = {
      from: '"Everpine" <rmthomas@charmify.io>',
      to: email,
      subject: `You have been invited to join ${team.name}`,
      html: `
        <p>You have been invited to join ${team.name} on Everpine.</p>
        <p>Click the link below to accept the invitation.</p>
        <a href="${process.env.FRONTEND_URL}/invite?email=${email}&token=${token}">Accept invitation</a>
      `,
    };

    res.json({ invites });

    try {
      await transporter.sendMail(msg);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const addMember = async (req, res) => {};

module.exports = { getMembers, addMember, createInvite };
