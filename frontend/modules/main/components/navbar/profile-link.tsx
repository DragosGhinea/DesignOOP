"use client";

import { Separator } from "@/components/ui/separator";
import { BellIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NotificationsButton = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div className="cursor-pointer p-2">
            <BellIcon className="size-6" fill="currentColor" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LogoutButton = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div className="cursor-pointer p-2" onClick={() => signOut()}>
            <LogOutIcon className="size-6" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Log out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProfileLink = () => {
  const { status } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Link
        href="/login"
        className="base-semibold p-6 text-light-700 transition-colors hover:text-dark-500 dark:hover:text-blue-300 [&_span]:before:hover:scale-x-100"
      >
        <span className="underline-animated relative">Login</span>
      </Link>
    );

  return (
    <div className="base-semibold flex items-center gap-5 text-light-700">
      <Link
        href="/profile"
        className="base-semibold p-6 transition-colors hover:text-dark-500 dark:hover:text-blue-300 [&_span]:before:hover:scale-x-100"
      >
        <span className="underline-animated relative">Profile</span>
      </Link>
      <Separator orientation="vertical" className="h-7 w-[2px] bg-current" />
      <NotificationsButton />
      <LogoutButton />
    </div>
  );
};

export default ProfileLink;
