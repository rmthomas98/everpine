const prisma = require("../../db/prisma");
const bcrypt = require("bcrypt");
const { createSession } = require("../../lib/session");

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Invalid email or password");
    }

    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    // compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json("Invalid password");

    // return user data
    res.json({ name: user.name, email: user.email, id: user.id });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

// this will be used to check if the user exists in the database
const checkUser = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    res.json("User exists");
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

// this will be to get the user id and access token
const googleSignIn = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");
    res.json(user.id);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { signIn, checkUser, googleSignIn };
