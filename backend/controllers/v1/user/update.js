const prisma = require("../../../db/prisma");
const sendVerificationEmail = require("../../../services/v1/emails/sendVerificationEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

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

const updateEmail = async (req, res) => {
  try {
    const { userId } = req;
    let { email } = req.body;

    if (!email) return res.status(400).json("Invalid request");
    email = email.toLowerCase().trim();

    // check if email already exists
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) {
      if (isUser.id === userId) {
        return res.status(400).json("You already have this email");
      }
      return res.status(400).json("Email is already in use");
    }

    // make sure email is valid
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) return res.status(400).json("Invalid email");

    // create new email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // update user email and emailVerificationToken and set email verified to false
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        emailVerificationToken: emailToken,
        isEmailVerified: false,
      },
    });

    if (!updatedUser) return res.status(400).json("Error updating email");

    // send email
    await sendVerificationEmail(email, emailToken);

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const updatePassword = async (req, res) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    // get user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(400).json("Invalid request");

    // check if new password is long enough
    if (newPassword.length < 8) {
      return res.status(400).json("Password must be at least 8 characters");
    }

    // check if user has password (social login users don't have password)
    if (!user.password) {
      // just update the password if one does not exist
      // check if passwords match passed from the frontend
      if (currentPassword !== newPassword) {
        return res.status(400).json("Passwords do not match");
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword, allowCredentialsAuth: true },
      });
      return res.json({});
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json("Invalid password");

    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the user's password in db
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, allowCredentialsAuth: true },
    });

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const updateAuth = async (req, res) => {
  try {
    const { userId } = req;
    const { credentials, google, twoFactorAuth } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(400).json("Invalid request");

    if (
      typeof credentials !== "boolean" ||
      typeof google !== "boolean" ||
      typeof twoFactorAuth !== "boolean"
    ) {
      return res.status(400).json("Invalid request");
    }

    if (!credentials && !google) {
      return res.status(400).json("Credentials or google auth must be enabled");
    }

    if (credentials && !user.password) {
      return res.status(400).json("Create a password to enable credentials");
    }

    // update the user's auth settings
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        allowCredentialsAuth: credentials,
        allowGoogleAuth: google,
        isTwoFactorAuthEnabled: credentials && twoFactorAuth,
      },
    });

    if (!updatedUser) {
      return res.status(400).json("Error updating auth settings");
    }

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const updateNotifs = async (req, res) => {
  try {
    const { userId } = req;
    const { allowCriticalNotifs, allowProductNotifs, allowMarketingNotifs } =
      req.body;

    if (
      typeof allowCriticalNotifs !== "boolean" ||
      typeof allowProductNotifs !== "boolean" ||
      typeof allowMarketingNotifs !== "boolean"
    ) {
      return res.status(400).json("Invalid request");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { allowCriticalNotifs, allowProductNotifs, allowMarketingNotifs },
    });

    if (!user) return res.status(400).json("Invalid request");
    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  updateName,
  updateEmail,
  updatePassword,
  updateAuth,
  updateNotifs,
};
