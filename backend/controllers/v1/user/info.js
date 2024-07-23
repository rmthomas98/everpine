const prisma = require("../../../db/prisma");

// this will be used to get the info for account settings page
const getInfo = async (req, res) => {
  try {
    // only need to get name, email, and avatar
    const user = await prisma.user.findFirst({
      where: { id: req.userId },
      select: {
        name: true,
        email: true,
        avatar: true,
        isEmailVerified: true,
        password: true,
        allowCredentialsAuth: true,
        allowGoogleAuth: true,
        isTwoFactorAuthEnabled: true,
        allowCriticalNotifs: true,
        allowProductNotifs: true,
        allowMarketingNotifs: true,
      },
    });
    if (!user) return res.status(400).json("Invalid request");
    if (user.password) user.password = true;
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { getInfo };
