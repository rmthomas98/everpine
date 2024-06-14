import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import WorkOs from "next-auth/providers/workos";
import Credentials from "next-auth/providers/credentials";
import { SignJWT, jwtVerify } from "jose";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const issueToken = async (payload, exp) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(encodedKey);
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    WorkOs({}),
    Credentials({
      authorize: async (credentials) => {
        const res = await fetch(`${baseUrl}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!res.ok) return null;
        return (await res.json()) ?? null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google") {
        const { name, email } = profile;
        // check if user exists in the database
        const res = await fetch(`${baseUrl}/auth/check-db`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        // create user if it doesn't exist
        if (!res.ok) {
          const res = await fetch(`${baseUrl}/user/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, provider: "google" }),
          });
          // return false if user creation fails
          if (!res.ok) return false;
        }
      }
      return true;
    },
    jwt: async ({ token, user, trigger, account, profile }) => {
      if (account) {
        const { provider } = account;
        // handle google signin
        if (provider === "google") {
          // need to query the database to get the user id and attach it to the token
          const res = await fetch(`${baseUrl}/auth/google-signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: profile.email }),
          });
          // need to stop the token from being issued if user not found
          if (!res.ok) throw new Error("User not found");

          // get user if from response and issue tokens
          const userId = await res.json();
          const accessToken = await issueToken({ userId }, "7d");
          const refreshToken = await issueToken({ userId }, "90d");

          return {
            user_id: userId,
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days,
            refresh_token_expires_at: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
          };
        }

        // handle credentials signin
        if (provider === "credentials") {
          // need to issue tokens here
          const accessToken = await issueToken({ userId: user.id }, "7d");
          const refreshToken = await issueToken({ userId: user.id }, "90d");

          return {
            user_id: user.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days,
            refresh_token_expires_at: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
          };
        }
      } else if (Date.now() < token.access_token_expires_at) {
        // subsequent requests, access token is still valid
        console.log("access token is still valid");
        return token;
      } else {
        // access token is expired, attempt to refresh it
        // if refresh token is expired, throw an error
        if (Date.now() >= token.refresh_token_expires_at) {
          throw new Error("Tokens expired");
        }
      }

      // // handle refreshing access token
      // if (token.accessToken && trigger !== "signIn") {
      //   console.log(token.accessToken);
      //   // decrypt the token
      //   try {
      //     // we do not need to do this, we can just set the expiration date in the token
      //     const { payload } = await jwtVerify(token.accessToken, encodedKey, {
      //       algorithms: ["HS256"],
      //     });
      //     console.log(new Date(payload.exp * 1000));
      //   } catch (e) {
      //     if (e.code === "ERR_JWT_EXPIRED") {
      //       console.log(token);
      //       // refresh token
      //       token.accessToken = await issueAccessToken({
      //         userId: token.id,
      //       });
      //     }
      //   }
      // }

      // if refresh token is expired, throw an error
      // throw new Error("Token expired");
      return token;
    },
    session: async ({ token, session }) => {
      // attach user id and access token to the session
      // so we can use it in the frontend
      if (token) {
        session.accessToken = token.access_token;
        session.user_id = token.user_id;
      }
      return session;
    },
  },
  pages: { signIn: "/signin", error: "/signup" },
});
