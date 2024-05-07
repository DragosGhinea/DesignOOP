"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export interface SWRKey {
  tags: string[];
  url: string;
  headers?: any;
  method?: string;
  body?: any;
  accessToken?: string;
}

const SessionSWRConfig = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

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

    const res = await fetch(key.url, options);
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
      const hasAccessToken = key.includes("accessToken");
      if (hasAccessToken) {
        signOut({ redirect: false }).then((data) => {
          router.push(data.url);
          toast.warning(
            "Your session ended abruptly. You will need to login again.",
            {
              duration: 5000,
            }
          );
        });
      }
    }
  };

  return <SWRConfig value={{ fetcher, onError }}>{children}</SWRConfig>;
};

export default SessionSWRConfig;
