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
      const { name, email, sub } = profile;
      const options = { email, name, sub };
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ token, session }) => {
      if (token) session.userId = token.id;
      return session;
    },
  },
  pages: { signIn: "/signin" },
});
