"use client";

import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export interface SWRKey {
  tags: string[];
  url: string;
  headers?: JSON;
  method?: string;
  body?: any;
}

const SessionSWRConfig = ({ children }: { children: ReactNode }) => {
  const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data: session } = useSession();

  const fetcher = async (key: SWRKey) => {
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: key.method || "GET",
    } as any;

    if (session?.user?.backend?.accessToken) {
      options.headers = new Headers({
        ...options.headers,
        Authorization: `Bearer ${session?.user.backend.accessToken}`,
      });
    }

    if (key.headers) {
      options.headers = new Headers({
        ...options.headers,
        ...key.headers,
      });
    }

    if (key.body) {
      options.body = JSON.stringify(key.body);
    }

    try {
      const res = await fetch(`${urlBase}${key.url}`, options);
      if (!res.ok) {
        toast.error("An error occurred while fetching data.", {
          duration: 5000,
        });
        console.log(await res.text());
        throw new Error("An error occurred while fetching data.");
      }

      return await res.json();
    } catch (e) {
      toast.error("An error occurred while fetching data.", {
        duration: 5000,
      });
      console.log(e);
      throw new Error("An error occurred while fetching data.");
    }
  };

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default SessionSWRConfig;
