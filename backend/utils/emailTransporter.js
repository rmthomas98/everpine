const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: "rmthomas@qryptic.io",
    pass: process.env.ZOHO_ACCESS_TOKEN,
  },
});

module.exports = transporter;
