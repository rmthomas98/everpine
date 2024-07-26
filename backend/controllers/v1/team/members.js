const prisma = require("../../../db/prisma");

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

module.exports = { getMembers };
