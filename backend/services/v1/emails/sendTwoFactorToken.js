const transporter = require("../../../utils/emailTransporter");

const sendTwoFactorToken = async (email, code) => {
  const msg = {
    from: '"Qryptic" <rmthomas@qryptic.io>',
    to: email,
    subject: "Your two factor auth code",
    html: `<p>Please enter this code to sign in to your account.</p><p>${code}</p>`,
  };

  try {
    await transporter.sendMail(msg);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

module.exports = sendTwoFactorToken;
