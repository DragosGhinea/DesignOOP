import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

export const extractExpirationFromBackendToken = (token: string): number => {
  const exp = jwtDecode(token).exp;
  if (!exp) throw new Error("Token does not contain an expiration date");
  return exp;
};

export const extractAuthoritiesFromBackendToken = (token: string): string[] => {
  const tokenDecoded: any = jwtDecode(token);
  if (!tokenDecoded.authorities) return [];
  return tokenDecoded.authorities;
};

export const extractSubjectFromBackendToken = (token: string): string => {
  const sub = jwtDecode(token).sub;
  if (!sub) throw new Error("Token does not contain a subject");
  return sub;
};

export const ensureAccessToken = async (
  token: JWT,
  expireDate: number
): Promise<JWT> => {
  if (Date.now() < expireDate) {
    return token;
  }

  return await refreshAccessToken(token);
};

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_BACKEND_URL}/v1/auth/refresh`,
      {
        headers: {
          "Content-Type": "application/json",
          "refresh-token": token.user.backend.refreshToken,
        },
        method: "POST",
      }
    );

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
