const prisma = require("../../db/prisma");
const { createTeam } = require("../../services/v1/team");

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
            slug: true,
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

const leaveTeam = async (req, res) => {
  try {
    const { userId } = req;
    const { teamId } = req.body;
    let changeDefault = false;

    // check user role within the team
    const userRole = await prisma.role.findFirst({
      where: { userId, teamId },
    });

    if (!userRole) {
      return res.status(400).json({
        message: "You are not a member of this team",
        description: "You cannot leave a team you are not a member of",
      });
    }

    // check if the user is an owner of the team
    if (userRole.role === "OWNER") {
      // check if there are other owners in the team
      const owners = await prisma.role.findMany({
        where: { teamId, role: "OWNER", isActive: true },
      });
      if (owners.length === 1) {
        return res.status(400).json({
          message: "You cannot leave the team",
          description:
            "There must be at least one team owner, either assign a new owner or delete the team.",
        });
      }
    }

    // allow the user to leave the team
    // delete role and disconnect user from team
    await prisma.role.delete({ where: { id: userRole.id } });
    await prisma.team.update({
      where: { id: teamId },
      data: { users: { disconnect: { id: userId } } },
    });

    // check if user is leaving the default team
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user.defaultTeamId === teamId) {
      // get all teams the user is a member of
      const roles = await prisma.role.findMany({
        where: { userId },
      });

      // get the first team
      const newDefaultTeam = roles[0]?.teamId;

      // if no team is found, then create a new team and set as default
      const teamName = user.email.split("@")[0];
      if (!newDefaultTeam) {
        const newTeam = await createTeam(teamName, null, null, user);
        await prisma.user.update({
          where: { id: userId },
          data: { defaultTeamId: newTeam.id },
        });
        changeDefault = true;
      } else {
        // set the first team as default
        await prisma.user.update({
          where: { id: userId },
          data: { defaultTeamId: newDefaultTeam },
        });
        changeDefault = true;
      }
    }

    // get all new roles for the user and return them to frontend
    const newRoles = await prisma.role.findMany({
      where: { userId },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            company: true,
            avatar: true,
            plan: true,
            slug: true,
          },
        },
      },
    });

    // get the default team
    const { defaultTeamId } = await prisma.user.findUnique({
      where: { id: userId },
      select: { defaultTeamId: true },
    });

    res.json({ roles: newRoles, defaultTeam: defaultTeamId, changeDefault });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getTeams,
  getRoles,
  updateDefault,
  leaveTeam,
};
