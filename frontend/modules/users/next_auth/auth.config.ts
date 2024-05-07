import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Discord from "next-auth/providers/discord";
import Github from "next-auth/providers/github";
import {
  extractAuthoritiesFromBackendToken,
  extractExpirationFromBackendToken,
  extractSubjectFromBackendToken,
} from "../utils/token-utils";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const response = await fetch("http://localhost:8081/v1/auth/refresh", {
      headers: {
        "Content-Type": "application/json",
        "refresh-token": token.user.backend.refreshToken,
      },
      method: "POST",
    });

    const newAccessToken = await response.json();

    if (!response.ok) {
      // If the response is 429 (TOO MANY REQUESTS), and it contains an access_token
      // it means that refreshing is in cooldown, and the previously generated access token is returned
      if (response.status !== 429 || !("access_token" in newAccessToken))
        throw newAccessToken;
    }

    return {
      ...token,
      user: {
        ...token.user,
        authorities: extractAuthoritiesFromBackendToken(
          newAccessToken.access_token
        ),
        backend: {
          ...token.user.backend,
          accessToken: newAccessToken.access_token,
          accessTokenExpiration: extractExpirationFromBackendToken(
            newAccessToken.access_token
          ),
        },
      },
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_USERS_BACKEND_URL}/v1/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                clientRegistrationId: account.provider,
                accessToken: account.access_token,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok || !data.access_token || !data.refresh_token) {
            throw data;
          }

          user.id = extractSubjectFromBackendToken(data.access_token);
          user.authorities = extractAuthoritiesFromBackendToken(
            data.access_token
          );
          delete user.name;
          delete user.email;
          delete user.image;
          user.backend = {
            accessTokenExpiration: extractExpirationFromBackendToken(
              data.access_token
            ),
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          };
        }

        return true;
      } catch (e) {
        const date = Date.now();
        console.log(`SignInError for ${user.email} at ${date}:`, e);
        return `/login?error=SignInException (Reference ${date})`;
      }
    },
    async jwt({ token, user }): Promise<JWT> {
      // Initial sign in
      if (user) {
        return {
          ...token,
          user: user as JWT["user"],
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.user.backend.accessTokenExpiration * 1000) {
        return token;
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user;

      if ("error" in token) {
        session.error = token.error as string;
      }

      return session;
    },
  },
  events: {
    signOut: async ({ token }) => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_USERS_BACKEND_URL}/v1/auth/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.user.backend.accessToken}`,
            },
          }
        );
      } catch (e) {}
    },
  },
};
