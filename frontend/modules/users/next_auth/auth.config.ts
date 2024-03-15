import { User, loginWithOAuth } from "@/prisma/dbServerActions";
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
      async profile(profile) {
        const user = await loginWithOAuth(
          "discord",
          profile.id,
          profile.email,
          profile.username,
          profile.avatar
        );

        return { ...user, role: "USER" };
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // async profile(profile) {
      //   console.log("Github profile", profile)
      //   const user = await loginWithOAuth(
      //     "github",
      //     profile.id,
      //     profile.email,
      //     profile.username,
      //     profile.avatar
      //   );

      //   return { ...user, role: "USER" };
      // },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT");
      console.log(account);
      if (user) {
        token.user = user as User;
      }
      if (account) {
        fetch("http://localhost:8081/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientRegistrationId: account.provider,
            accessToken: account.access_token,
          }),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user = token.user;

      return session;
    },
  },
};
