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
      include: { team: true },
    });

    res.json(roles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTeams,
  getRoles,
};
