const prisma = require("../../../db/prisma");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");
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

    // create customer in stripe for the team
    // we will use this to create subscriptions for the team
    // only teams will have subscriptions, not individual users
    const customer = await stripe.customers.create({
      email,
      name: name ? name : email.split("@")[0],
    });

    // generate random avatar for the user
    const avatar = `https://api.dicebear.com/9.x/lorelei/png?seed=${email}`;

    // generate random avatar for the team
    // generate random number from 1 to 5
    const random = Math.floor(Math.random() * 5) + 1;
    const teamAvatar = `/images/avatars/${random}.webp`;

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
          isEmailVerified: provider === "google" ? true : false,
        },
      });

      // create a default team for the user
      team = await prisma.team.create({
        data: {
          name: name ? name : email.split("@")[0],
          avatar: teamAvatar,
          stripeCustomerId: customer?.id,
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
