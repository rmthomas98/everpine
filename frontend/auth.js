import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import WorkOs from "next-auth/providers/workos";
import Credentials from "next-auth/providers/credentials";
import { issueToken } from "@/lib/token";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    jwt: async ({ token, user, account, profile }) => {
      // initial signin
      if (account) {
        const { provider } = account;
        let userId = user?.id;
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

          // get user id from response and issue tokens
          userId = await res.json();
        }

        // issue an access token with user id
        const accessToken = await issueToken({ user_id: userId }, "1d");
        const refreshToken = await issueToken({ user_id: userId }, "90d");

        return {
          user_id: userId,
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: Date.now() + 1000 * 60 * 60 * 24, // 1 day
        };
      }

      // we will handle token refresh in middleware instead

      return token;
    },
    session: async ({ token, session }) => {
      // attach user id and access token to the session
      if (token) {
        session.access_token = token.access_token;
        session.user_id = token.user_id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/signin", error: "/signup" },
});
