const prisma = require("../../../db/prisma");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");
const { createSession } = require("../../../lib/session");

const create = async (req, res) => {
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

    // create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerificationToken,
      },
    });

    // make sure the user was created
    if (!user) return res.status(500).json("User could not be created");

    // create a default team for the user
    await prisma.team.create({
      data: {
        name: "Personal",
        userId: user.id,
      },
    });

    res.json("user created");

    // we will execute this after the response is sent
    // so user doesn't have to wait for the email to be sent
    await sendVerificationEmail(email, emailVerificationToken);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error creating user");
  }
};

module.exports = create;
