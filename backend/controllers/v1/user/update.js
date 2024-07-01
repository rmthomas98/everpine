const prisma = require("../../../db/prisma");

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

module.exports = { updateName };
