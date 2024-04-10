"use client";

import React, { createContext, ReactNode } from "react";
import { useSession } from "next-auth/react";

export interface FetchWithAuthorizationContextType {
  fetcherWithAuthorization: (url: string, options: any) => Promise<Response>;
}

export const FetchWithAuthorizationContext = createContext<
  FetchWithAuthorizationContextType | undefined
>(undefined);

interface FetchWithAuthorizationProviderProps {
  children: ReactNode;
}

const FetchWithAuthorizationProvider = ({
  children,
}: FetchWithAuthorizationProviderProps) => {
  const { data: session } = useSession();
  const accessToken = session?.user?.backend?.accessToken;

  const fetcherWithAuthorization = (url: string, options: any) => {
    if (!accessToken) return fetch(url, options);

    if (!options.headers)
      return fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <FetchWithAuthorizationContext.Provider
      value={{
        fetcherWithAuthorization,
      }}
    >
      {children}
    </FetchWithAuthorizationContext.Provider>
  );
};

export default FetchWithAuthorizationProvider;
