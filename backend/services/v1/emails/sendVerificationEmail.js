const transporter = require("../../../utils/emailTransporter");

const sendVerificationEmail = async (email, emailVerificationToken) => {
  // create message
  const message = {
    from: '"Qryptic" <rmthomas@qryptic.io>',
    to: email,
    subject: "Verify your email",
    html: `<p>Please click the link below to get your account up and running.</p><br>${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}&email=${email}`,
  };

  // send email
  await transporter.sendMail(message);

  return true;
};

module.exports = sendVerificationEmail;
