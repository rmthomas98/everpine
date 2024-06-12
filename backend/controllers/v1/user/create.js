const prisma = require("../../../db/prisma");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");

const createByCredentials = async (req, res) => {
  try {
    let { email, password } = req.body;
    // make sure we have the email and password
    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    // format email
    email = email.toLowerCase().trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) return res.status(400).json("Invalid email");

    // make sure the email is unique
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) return res.status(400).json("Email already exists");

    // hash the password and create email verification token
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    let user;
    let team;
    let role;

    try {
      // create the user
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          emailVerificationToken,
        },
      });

      // create a default team for the user
      team = await prisma.team.create({
        data: {
          name: email.split("@")[0],
          users: { connect: { id: user.id } },
        },
      });

      // create a role for the user
      role = await prisma.role.create({
        data: { userId: user.id, teamId: team.id },
      });

      // set default team for user
      await prisma.user.update({
        where: { id: user.id },
        data: { defaultTeamId: team.id },
      });
    } catch (e) {
      console.log(e);
      // delete the user and team if there is an error
      if (user) await prisma.user.delete({ where: { id: user.id } });
      if (team) await prisma.team.delete({ where: { id: team.id } });
      if (role) await prisma.role.delete({ where: { id: role.id } });
    }

    res.json("user created");

    // we will execute this after the response is sent
    // so user doesn't have to wait for the email to be sent
    await sendVerificationEmail(email, emailVerificationToken);
  } catch (e) {
    console.log(e);
    res.status(500).json("Something went wrong");
  }
};

const createByGoogle = async (req, res) => {};

module.exports = {
  createByCredentials,
  createByGoogle,
};
