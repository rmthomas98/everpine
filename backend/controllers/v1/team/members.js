const prisma = require("../../../db/prisma");

const getMembers = async (req, res) => {
  try {
    const { userId } = req;
    const { teamId } = req.body;

    const members = await prisma.role.findMany({
      where: { teamId },
      include: {
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

module.exports = { getMembers };
