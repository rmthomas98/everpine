import "server-only";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const issueToken = async (payload, exp) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(encodedKey);
};

export const refreshAccessToken = async (token) => {
  try {
    const { refresh_token, user_id } = token;
    // check if there is a refresh token
    if (!refresh_token) return null;

    // verify the refresh token
    const { payload } = await jwtVerify(refresh_token, encodedKey, {
      algorithms: ["HS256"],
    });
    if (!payload) return null;

    // issue a new access token
    if (payload.user_id !== user_id) return null;
    const accessToken = await issueToken({ user_id }, "1d");

    return {
      ...token,
      access_token: accessToken,
      expires_at: Date.now() + 1000 * 60 * 60 * 24, // 1 day
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

// export async function updateSession(request) {
//   const session = request?.cookies?.get("session")?.value;
//   if (!session) return;
//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//   });
//   return res;
// }
//
// export const destroySession = async () => {
//   cookies().delete("authjs.session-token");
// };
