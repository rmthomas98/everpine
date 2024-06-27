const prisma = require("../../../db/prisma");

// this will be used to get the info for account settings page

const getGeneral = async (req, res) => {
  try {
    // only need to get name, email, and avatar
    const user = await prisma.user.findFirst({
      where: { id: req.userId },
      select: { name: true, email: true, avatar: true },
    });
    if (!user) return res.status(400).json("Invalid request");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { getGeneral };
