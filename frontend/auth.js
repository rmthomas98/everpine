import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import WorkOs from "next-auth/providers/workos";
import Credentials from "next-auth/providers/credentials";

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
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "google") {
        const { name, email } = profile;
        // check if user exists in the database
        const res = await fetch(`${baseUrl}/auth/check-db`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) {
          // create user if it doesn't exist
          const res = await fetch(`${baseUrl}/user/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, provider: "google" }),
          });
          if (!res.ok) return false;
        }
      }
      return true;
    },
    jwt: async ({ token, user, trigger, account, profile }) => {
      if (account?.provider === "google" && trigger === "signIn") {
        // need to query the database to get the user id and attach it to the token
        const res = await fetch(`${baseUrl}/auth/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: profile.email }),
        });
        if (!res.ok) return token;
        token.id = await res.json();
        return token;
      }
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ token, session }) => {
      if (token) session.userId = token.id;
      return session;
    },
  },
  pages: { signIn: "/signin", error: "/signup" },
});
