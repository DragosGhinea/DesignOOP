"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";
import { ContactIcon, LogOutIcon, UserIcon } from "lucide-react";

const ProfileLinkMobile = ({ variant = "default" }: { variant: string }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Link
        href="/login"
        className="flex items-center gap-5 rounded-md bg-slate-100 p-6 font-semibold dark:bg-dark-300 [&_span]:before:hover:scale-x-100"
      >
        <UserIcon className="size-8" />
        <span className="underline-animated relative">Login</span>
      </Link>
    );

  return (
    <>
      <Link
        href="/profile"
        className="flex items-center gap-5 rounded-md bg-slate-100 p-6 font-semibold dark:bg-dark-300 [&_span]:before:hover:scale-x-100"
      >
        <ContactIcon className="size-8" />
        <span className="underline-animated relative">Profile</span>
      </Link>
      <div
        onClick={() => {
          signOut({ redirect: false }).then((data) => router.push(data.url));
        }}
        className="flex items-center gap-5 rounded-md bg-slate-100 p-6 font-semibold dark:bg-dark-300 [&_span]:before:hover:scale-x-100"
      >
        <LogOutIcon className="size-8" />
        <span className="underline-animated relative">Logout</span>
      </div>
    </>
  );
};

export default ProfileLinkMobile;
