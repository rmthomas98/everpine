const prisma = require("../../../db/prisma");

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

module.exports = {
  getUserByEmailToken,
};
