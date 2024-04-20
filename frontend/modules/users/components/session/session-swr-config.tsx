"use client";

import React, { ReactNode } from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export interface SWRKey {
  tags: string[];
  url: string;
  headers?: JSON;
  method?: string;
  body?: any;
  accessToken?: string;
}

const SessionSWRConfig = ({ children }: { children: ReactNode }) => {
  const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetcher = async (key: SWRKey) => {
    if (key.accessToken === "loading") return;

    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: key.method || "GET",
    } as any;

    if (key.accessToken) {
      options.headers = new Headers({
        ...options.headers,
        Authorization: `Bearer ${key.accessToken}`,
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

    const res = await fetch(`${urlBase}${key.url}`, options);
    if (!res.ok) {
      if (res.status === 401) {
        let error;
        try {
          error = await res.json();
        } catch (e) {
          error = { message: "The error message is not of JSON type." };
        }

        throw error;
      }

      toast.error("An error occurred while fetching data.", {
        duration: 5000,
      });

      console.log(await res.text());
      throw new Error("An error occurred while fetching data.");
    }

    return await res.json();
  };

  const onError = (error: any, key: string) => {
    if (error.status === 401) {
      console.log("401 error", key, error);
    }
  };

  return <SWRConfig value={{ fetcher, onError }}>{children}</SWRConfig>;
};

export default SessionSWRConfig;
