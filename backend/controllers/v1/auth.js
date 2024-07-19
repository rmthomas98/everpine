const prisma = require("../../db/prisma");
const bcrypt = require("bcrypt");
const getUserInfo = require("../../services/v1/auth/getUserInfo");
const transporter = require("../../utils/emailTransporter");

const checkTwoFactor = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.json("Invalid request");
    email = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("Invalid email or password");

    if (!user.password) {
      return res.status(401).json("Please try a different sign in method");
    }

    if (!user.isTwoFactorAuthEnabled) return res.json({ isEnabled: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid email or password");
    }

    if (!user.allowCredentialsAuth) {
      return res.status(401).json("Please try a different sign in method");
    }

    // if user has two factor enabled, generate a 6 number code and email it to the user
    const code = Math.floor(100000 + Math.random() * 900000);
    // update user with the code
    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorAuthSecret: code.toString() },
    });

    // send email
    const message = {
      from: '"Airtoken" <rmthomas@charmify.io>',
      to: email,
      subject: "Your two factor auth code",
      html: `<p>Please enter this code to sign in to your account.</p><br><p>${code}</p>`,
    };

    await transporter.sendMail(message);

    res.json({ isEnabled: true });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const verifyTwoFactor = async (req, res) => {
  try {
    let { email, twoFactorCode } = req.body;
    email = email?.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    const { twoFactorAuthSecret } = user;
    if (twoFactorCode !== twoFactorAuthSecret) {
      return res.status(401).json("Invalid code");
    }

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const resendTwoFactor = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    const code = Math.floor(100000 + Math.random() * 900000);
    // update user with the code
    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorAuthSecret: code.toString() },
    });

    // send email
    const message = {
      from: '"Airtoken" <rmthomas@charmify.io>',
      to: email,
      subject: "Your two factor auth code",
      html: `<p>Please enter this code to sign in to your account.</p><br><p>${code}</p>`,
    };

    await transporter.sendMail(message);

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const signIn = async (req, res) => {
  try {
    let { email, password, twoFactorCode } = req.body;
    if (!email || !password) {
      return res.status(400).json("Invalid email or password");
    }

    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json("User not found");

    // check if user has password, if not, they signed up with google
    if (!user.password) {
      return res.status(401).json("Please use Google to sign in");
    }

    // check if user is allowed to sign in with credentials
    if (!user.allowCredentialsAuth) return res.status(401).json("not allowed");

    // compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json("Invalid password");

    // check if 2fa is enabled and verify code
    if (user.isTwoFactorAuthEnabled) {
      if (!twoFactorCode) return res.json("2fa code required");
      if (twoFactorCode !== user.twoFactorAuthSecret) {
        return res.status(401).json("Invalid code");
      }

      // update user
      await prisma.user.update({
        where: { email },
        data: { twoFactorAuthSecret: null },
      });
    }

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
    if (!user) return res.status(404).json("user not found");

    // check if user is allowed to login with google
    if (!user.allowGoogleAuth) return res.status(401).json("not allowed");

    res.json({});
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

const me = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(401).json("Unauthorized");
    const user = await getUserInfo(userId);
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  signIn,
  checkUser,
  googleSignIn,
  me,
  checkTwoFactor,
  verifyTwoFactor,
  resendTwoFactor,
};
