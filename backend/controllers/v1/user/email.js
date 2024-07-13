const prisma = require("../../../db/prisma");
const crypto = require("crypto");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");

const verifyEmail = async (req, res) => {
  try {
    let { token, email } = req.body;

    // check if token and email are provided
    if (!email || !token) return res.status(400).json("Invalid request");

    // normalize email
    email = email.toLowerCase().trim();

    // look up user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json("Invalid request");

    // check if token matches user's token from db
    const { emailVerificationToken } = user;
    if (emailVerificationToken !== token) {
      return res.status(400).json("Invalid token");
    }

    // update user's emialVerified to true and delete emailVerificationToken
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isEmailVerified: true, emailVerificationToken: null },
    });

    if (!updatedUser)
      return res.status(400).json("An error occured while verifying email");

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const resendVerification = async (req, res) => {
  try {
    const { userId } = req;

    // get user email
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(400).json("Invalid request");

    // check if email is already verified
    if (user.isEmailVerified) {
      return res.status(400).json("Email already verified");
    }

    // create new email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // update user's emailVerificationToken
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { emailVerificationToken: emailToken },
    });

    // send email
    await sendVerificationEmail(user.email, emailToken);

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { verifyEmail, resendVerification };
