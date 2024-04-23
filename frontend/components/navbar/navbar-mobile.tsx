"use client";

import { cn } from "@/utils/common";
import Link from "next/link";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { ThemeToggle } from "../shared/theme-toggle";
import { Divide as Hamburger } from "hamburger-react";
import NavbarMobileSidebar from "./navbar-mobile-sidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import { BookOpenIcon } from "lucide-react";
import ProfileLinkMobile from "./profile-link-mobile";

const UnderlineAnimated = ({ children }: { children: ReactNode }) => {
  return <span className="underline-animated relative">{children}</span>;
};

const NavbarMobile = ({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: string;
}) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);

  return (
    <>
      <NavbarMobileSidebar
        isOpen={sideBarOpened}
        setOpen={setSideBarOpened}
        content={
          <ScrollArea className="size-full">
            <SheetHeader>
              <SheetTitle className="text-4xl">Menu</SheetTitle>
            </SheetHeader>
            <div className="h4-typography flex flex-col gap-5 p-6">
              <ProfileLinkMobile variant={variant} />
              <Link
                href="/courses"
                className="flex items-center gap-5 rounded-md bg-slate-100 p-6 font-semibold dark:bg-dark-300 [&_span]:before:hover:scale-x-100"
              >
                <BookOpenIcon className="size-8" />
                <UnderlineAnimated>Courses</UnderlineAnimated>
              </Link>
            </div>
          </ScrollArea>
        }
      />
      <div
        className={cn(
          "z-50 flex w-full items-center justify-between gap-5 px-6 sm:px-12",
          variant === "main" && "fixed top-0 text-light-700",
          variant === "default" &&
            "text-dark-500 shadow-md dark:border-b-2 dark:text-light-700 dark:shadow-none bg-inherit",
          className
        )}
      >
        <Link
          href="/"
          className={cn(
            "h5-typography flex items-center gap-1 font-bold [&_span]:before:hover:scale-x-100",
            variant === "main" &&
              "transition-colors hover:text-dark-500 dark:hover:text-blue-300",
            variant === "default" && "relative"
          )}
        >
          <Image
            src="/assets/images/logo.png"
            width={80}
            height={80}
            alt="logo"
          />
          <UnderlineAnimated>DesignOOP</UnderlineAnimated>
        </Link>
        <div className="flex gap-2">
          <Hamburger
            toggled={sideBarOpened}
            onToggle={(toggled) => {
              setSideBarOpened(toggled);
            }}
          />
          <li
            className={cn(
              "flex items-center sm:pl-6",
              variant === "main" && "text-black dark:text-white"
            )}
          >
            <ThemeToggle />
          </li>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
