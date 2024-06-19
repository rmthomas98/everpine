const prisma = require("../../db/prisma");

const getTeams = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { teams } = await prisma.user.findUnique({
      where: { id: userId },
      include: { teams: true },
    });

    res.json({ teams });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// this function will include the roles with the team
const getRoles = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const roles = await prisma.role.findMany({
      where: { userId },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            company: true,
            avatar: true,
            plan: true,
          },
        },
      },
    });

    // get default team
    const { defaultTeamId } = await prisma.user.findUnique({
      where: { id: userId },
      select: { defaultTeamId: true },
    });

    res.json({ roles, defaultTeamId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDefault = async (req, res) => {
  try {
    const { userId } = req;
    const { teamId } = req.body;

    if (!teamId) return res.status(400).json("Invalid request");

    await prisma.user.update({
      where: { id: userId },
      data: { defaultTeamId: teamId },
    });

    res.json();
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getTeams,
  getRoles,
  updateDefault,
};
