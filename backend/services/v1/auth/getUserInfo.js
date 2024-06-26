const prisma = require("../../../db/prisma");
const { createTeam } = require("../team");

const getUserInfo = async (userId) => {
  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        isEmailVerified: true,
        defaultTeamId: true,
        roles: {
          select: {
            role: true,
            team: {
              select: {
                id: true,
                name: true,
                plan: true,
                slug: true,
                subscription: {
                  select: { id: true, status: true, cancelAtPeriodEnd: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    // get role for default team
    let role = user?.roles.find((role) => role.team.id === user.defaultTeamId);

    // make sure user has default team
    if (!role) {
      // check if user has any roles
      if (user.roles.length === 0) {
        // create a default team for the user
        const newTeam = await createTeam(user.name, null, null, user);
        // set default team for user
        await prisma.user.update({
          where: { id: user.id },
          data: { defaultTeamId: newTeam.id },
        });

        // re-query the user
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isEmailVerified: true,
            defaultTeamId: true,
            roles: {
              select: {
                role: true,
                team: {
                  select: {
                    id: true,
                    name: true,
                    plan: true,
                    slug: true,
                    subscription: {
                      select: {
                        id: true,
                        status: true,
                        cancelAtPeriodEnd: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        // get role for default team
        role = user?.roles.find((role) => role.team.id === user.defaultTeamId);
      } else {
        // set the first role as default team
        await prisma.user.update({
          where: { id: user.id },
          data: { defaultTeamId: user.roles[0].team.id },
        });

        // re-query the user
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isEmailVerified: true,
            defaultTeamId: true,
            roles: {
              select: {
                role: true,
                team: {
                  select: {
                    id: true,
                    name: true,
                    plan: true,
                    slug: true,
                    subscription: {
                      select: {
                        id: true,
                        status: true,
                        cancelAtPeriodEnd: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        // get role for default team
        role = user?.roles.find((role) => role.team.id === user.defaultTeamId);
      }
    }

    user.team = role.team;
    user.role = role.role;
    user.name = user.name ? user.name : "";
    delete user.roles;

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = getUserInfo;
