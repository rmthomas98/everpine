const prisma = require("../../db/prisma");
const bcrypt = require("bcrypt");
const { createSession } = require("../../lib/session");

const me = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Invalid user id");
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).send("User not found");
    const { email, isEmailVerified, subscriptionStatus } = user;
    res.json({ id, email, isEmailVerified, subscriptionStatus });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Invalid email or password");

    email = email.toLowerCase().trim();
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).send("User not found");

    // compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid password");

    // create session
    const { session, options } = await createSession({ id: user.id });

    // set the token in the cookie and send the response
    res.cookie("session", session, options);
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const signOut = async (req, res) => {
  res.clearCookie("session");
  res.send("Signed out");
};

module.exports = { me, signOut, signIn };
