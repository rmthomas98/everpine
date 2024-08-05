const transporter = require("../../../utils/emailTransporter");

const sendMemberInvite = async (email, token, teamName) => {
  const msg = {
    from: '"Qryptic" <rmthomas@qryptic.io>',
    to: email,
    subject: `You have been invited to join ${teamName}`,
    html: `
        <p>You have been invited to join team ${teamName} on Qrytpic.</p>
        <p>Click the link below to accept the invitation.</p>
        <a href="${process.env.FRONTEND_URL}/invite?token=${token}">View invitation</a>
      `,
  };

  try {
    await transporter.sendMail(msg);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

module.exports = sendMemberInvite;
