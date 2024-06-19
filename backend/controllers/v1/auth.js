const prisma = require("../../db/prisma");
const bcrypt = require("bcrypt");
const { createSession } = require("../../lib/token");
const { createTeam } = require("../../services/v1/team");

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Invalid email or password");
    }

    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    // compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json("Invalid password");

    // return user data
    res.json({ name: user.name, email: user.email, id: user.id });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

// this will be used to check if the user exists in the database
const checkUser = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    res.json("User exists");
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

// this will be to get the user id and access token
const googleSignIn = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");
    res.json(user.id);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const me = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(401).json("Unauthorized");

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
                subscription: {
                  select: { id: true, status: true, cancelAtPeriodEnd: true },
                },
              },
            },
          },
        },
      },
    });

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
      }
    }

    user.team = role.team;
    user.role = role.role;
    delete user.roles;

    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { signIn, checkUser, googleSignIn, me };
