const { SignJWT, jwtVerify } = require("jose");

const secretKey = process.env.TOKEN_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const encrypt = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

const decrypt = async (session) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    return null;
  }
};

const createSession = async (data) => {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ ...data, expiresAt: expires });

  const options = {
    httpOnly: true,
    domain: process.env.DOMAIN,
    expires,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  return { session, options };
};

const verifySession = async (cookie) => {
  const session = await decrypt(cookie);
  if (!session || !session?.id) return null;
  return session;
};

module.exports = {
  encrypt,
  decrypt,
  createSession,
  verifySession,
};
