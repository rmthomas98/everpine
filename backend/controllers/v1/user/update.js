const prisma = require("../../../db/prisma");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");
const crypto = require("crypto");

const updateName = async (req, res) => {
  try {
    const { userId } = req;
    const { name } = req.body;

    // make sure name is no longer than 36 characters
    if (name?.length > 36) return res.status(400).json("Name is too long");

    // update the user's name
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: name?.trim() || null },
    });

    if (!updatedUser) return res.status(400).json("Invalid request");

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const updateEmail = async (req, res) => {
  try {
    const { userId } = req;
    let { email } = req.body;

    if (!email) return res.status(400).json("Invalid request");
    email = email.toLowerCase().trim();

    // check if email already exists
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) {
      if (isUser.id === userId) {
        return res.status(400).json("You already have this email");
      }
      return res.status(400).json("Email is already in use");
    }

    // make sure email is valid
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) return res.status(400).json("Invalid email");

    // create new email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // update user email and emailVerificationToken and set email verified to false
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        emailVerificationToken: emailToken,
        isEmailVerified: false,
      },
    });

    if (!updatedUser) return res.status(400).json("Error updating email");

    // send email
    await sendVerificationEmail(email, emailToken);

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { updateName, updateEmail };
