import NextAuth, { Session } from "next-auth";
import Discord from "next-auth/providers/discord";
import type { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      globalName: string;
    };
    accessToken: string;
  }
  interface Profile {
    global_name: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.globalName = profile.global_name;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken  = token.accessToken as string
      session.user.id = token.sub as string;
      session.user.globalName = token.globalName as string
      return session;
    },
  }
})

export default NextAuth;