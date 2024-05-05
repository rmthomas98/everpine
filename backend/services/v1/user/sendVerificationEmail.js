const transporter = require("../../../utils/emailTransporter");

const sendVerificationEmail = async (email, emailVerificationToken) => {
  // create message
  const message = {
    from: '"Dreamist" <rmthomas@charmify.io>',
    to: email,
    subject: "Verify your email",
    html: `<p>Thank you for creating a Dreamist account. Please click the link below to get your account up and running.</p><br>${process.env.CLIENT_ORIGIN}/verify-account?token=${emailVerificationToken}`,
  };

  // send email
  await transporter.sendMail(message);

  return true;
};

module.exports = sendVerificationEmail;
