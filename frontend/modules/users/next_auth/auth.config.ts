import { NextAuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";
import Github from "next-auth/providers/github";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      profile(profile) {
        console.log(profile);

        return { ...profile, role: "USER" };
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        console.log(profile);

        return { ...profile, role: "USER" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;

      return session;
    },
  },
};
