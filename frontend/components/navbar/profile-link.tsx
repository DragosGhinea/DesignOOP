"use client";

import { Separator } from "@/components/ui/separator";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/common";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="cursor-pointer p-2 transition-colors"
          onClick={() => {
            signOut({ redirect: false }).then((data) => router.push(data.url));
          }}
        >
          <LogOutIcon className="size-6" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Log out</p>
      </TooltipContent>
    </Tooltip>
  );
};

const ProfileLink = ({ variant = "default" }: { variant: string }) => {
  const { status } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Link
        href="/login"
        className={cn(
          "p-typography p-6 font-semibold  transition-colors [&_span]:before:hover:scale-x-100",
          variant === "main" &&
            "text-light-700 hover:text-dark-500 dark:hover:text-blue-300"
        )}
      >
        <span className="underline-animated relative">Login</span>
      </Link>
    );

  return (
    <div
      className={cn(
        "p-typography flex items-center gap-5 font-semibold",
        variant === "main" && "text-light-700"
      )}
    >
      <Link
        href="/profile"
        className={cn(
          "p-typography p-6 font-semibold transition-colors [&_span]:before:hover:scale-x-100",
          variant === "main" && "hover:text-dark-500 dark:hover:text-blue-300"
        )}
      >
        <span className="underline-animated relative">Profile</span>
      </Link>
      <Separator
        orientation="vertical"
        className={cn("h-7 w-[2px]", variant === "main" && "bg-current")}
      />
      <LogoutButton />
    </div>
  );
};

export default ProfileLink;
