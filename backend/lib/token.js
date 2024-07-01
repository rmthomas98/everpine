const { jwtVerify } = require("jose");

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    const { exp } = payload;
    if (Date.now() < exp * 1000) {
      const { user_id } = payload;
      if (!user_id) return null;
      return user_id;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = verifyToken;
