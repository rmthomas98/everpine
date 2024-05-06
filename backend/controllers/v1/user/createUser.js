const prisma = require("../../../db/prisma");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");
const { createSession } = require("../../../lib/session");

const createUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // make sure we have the email and password
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // format email
    email = email.toLowerCase().trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) return res.status(400).send("Invalid email");

    // make sure the email is unique
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) return res.status(400).send("Email already exists");

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
    if (!user) return res.status(500).send("User could not be created");

    // set cookies and send the response
    const { session, options } = await createSession({
      id: user.id,
      email: user.email,
    });

    // set the token in the cookie and send the response
    res.cookie("session", session, options);
    res.send("user created");

    // we will execute this after the response is sent
    // so user doesn't have to wait for the email to be sent
    await sendVerificationEmail(email, emailVerificationToken);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error creating user");
  }
};

module.exports = createUser;
