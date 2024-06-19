const prisma = require("../../../db/prisma");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");
const { createTeam } = require("../../../services/v1/team");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const create = async (req, res) => {
  try {
    let { name, email, password, provider } = req.body;

    // check provider and make sure we have the required fields
    if (provider !== "credentials" && provider !== "google") {
      return res.status(400).json("Invalid provider");
    }

    if (provider === "credentials") {
      if (!email || !password) {
        return res.status(400).json("Invalid request");
      }
    }

    if (provider === "google") {
      if (!email) {
        return res.status(400).json("Invalid request");
      }
    }

    // format email
    email = email.toLowerCase().trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) return res.status(400).json("Invalid email");

    // make sure the email is unique
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) return res.status(400).json("Email already exists");

    let hashedPassword;
    let emailVerificationToken;
    if (provider === "credentials") {
      // hash the password and create email verification token
      hashedPassword = await bcrypt.hash(password, 10);
      emailVerificationToken = crypto.randomBytes(32).toString("hex");
    }

    // generate random avatar for the user
    const avatar = `https://api.dicebear.com/9.x/pixel-art/png?seed=${email}`;

    let user;
    let team;
    let role;

    try {
      // create the user
      user = await prisma.user.create({
        data: {
          name,
          email,
          avatar,
          password: hashedPassword || null,
          emailVerificationToken: emailVerificationToken || null,
          isEmailVerified: provider === "google",
        },
      });

      // create a default team for the user
      team = await createTeam(name, null, null, user);

      // set default team for user
      await prisma.user.update({
        where: { id: user.id },
        data: { defaultTeamId: team.id },
      });

      role = await prisma.role.findFirst({
        where: { teamId: team.id, userId: user.id },
      });
    } catch (e) {
      console.log(e);
      // delete the user and team if there is an error
      if (user) await prisma.user.delete({ where: { id: user.id } });
      if (team) await prisma.team.delete({ where: { id: team.id } });
      if (role) await prisma.role.delete({ where: { id: role.id } });
    }

    res.json("user created");

    if (provider === "credentials") {
      // we will execute this after the response is sent
      // so user doesn't have to wait for the email to be sent
      await sendVerificationEmail(email, emailVerificationToken);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Something went wrong");
  }
};

module.exports = { create };
