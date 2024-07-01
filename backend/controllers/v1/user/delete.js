const prisma = require("../../../db/prisma");

const deleteUser = async (req, res) => {
  try {
    const { userId } = req;

    // delete the user
    const user = await prisma.user.delete({ where: { id: userId } });

    res.status(204).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { deleteUser };
