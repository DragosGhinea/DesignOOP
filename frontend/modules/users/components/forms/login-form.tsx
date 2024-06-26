"use client";

import DiscordIcon from "@/components/icons/discord-icon";
import GithubIcon from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const signInClick = (provider: string) => {
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <Button
        className="h6-typography flex w-full items-center gap-3 bg-[#7289da] hover:bg-[#677bc4] dark:bg-[#5865f2] dark:text-white dark:hover:bg-[#4e5dc4]"
        size="lg"
        onClick={() => signInClick("discord")}
      >
        <DiscordIcon className="size-8" /> Discord
      </Button>
      <Button
        className="h6-typography flex w-full items-center gap-3"
        size="lg"
        onClick={() => signInClick("github")}
      >
        <GithubIcon className="size-8" /> GitHub
      </Button>
    </div>
  );
};

export default LoginForm;
