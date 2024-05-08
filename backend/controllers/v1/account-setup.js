const { verifySession } = require("../../lib/session");
const prisma = require("../../db/prisma");
const sendVerificationEmail = require("../../services/v1/user/sendVerificationEmail");

const resendVerificationEmail = async (req, res) => {
  try {
    const session = await verifySession(req.cookies.session);
    if (!session) return res.status(401).send("Unauthorized");

    const { id } = session;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return res.status(404).send("User not found");

    const { email, emailVerificationToken } = user;

    if (!emailVerificationToken)
      return res.status(400).send("Email already verified");

    // send verification email
    try {
      await sendVerificationEmail(email, emailVerificationToken);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error sending email");
    }

    res.send("Email sent");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const getUserByEmailToken = async (req, res) => {
  try {
    const { emailToken } = req.params;
    const user = await prisma.user.findUnique({
      where: { emailVerificationToken: emailToken },
    });
    if (!user) return res.status(404).send("User not found");
    res.json({ email: user.email, isEmailVerified: user.isEmailVerified });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const verifyEmail = async (req, res) => {};

module.exports = {
  resendVerificationEmail,
  getUserByEmailToken,
  verifyEmail,
};
