import { jwtVerify } from "jose";

const secretKey = process.env.TOKEN_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const decrypt = async (session) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log(e);
    return null;
  }
};
