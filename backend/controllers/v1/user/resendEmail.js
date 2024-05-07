const prisma = require("../../../db/prisma");
const sendVerificationEmail = require("../../../services/v1/user/sendVerificationEmail");
const { verifySession } = require("../../../lib/session");

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

module.exports = resendVerificationEmail;
