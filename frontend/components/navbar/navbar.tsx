import { ThemeToggle } from "@/components/shared/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";
import ProfileLink from "@/components/navbar/profile-link";
import { cn } from "@/lib/utils";

const UnderlineAnimated = ({ children }: { children: ReactNode }) => {
  return <span className="underline-animated relative">{children}</span>;
};

const Navbar = ({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: string;
}) => {
  return (
    <div
      className={cn(
        "z-50 flex w-full items-center justify-between gap-5 px-6 sm:px-12",
        variant === "main" && "fixed top-0 text-light-700",
        variant === "default" &&
          "text-dark-500 shadow-md dark:border-b-2 dark:text-light-700 dark:shadow-none",
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
      <ul className="flex min-w-[40%] items-center justify-around">
        <li>
          <Link
            href="/courses"
            className={cn(
              "p-typography p-6 font-semibold [&_span]:before:hover:scale-x-100",
              variant === "main" &&
                "transition-colors hover:text-dark-500 dark:hover:text-blue-300"
            )}
          >
            <UnderlineAnimated>Courses</UnderlineAnimated>
          </Link>
        </li>
        <li>
          <ProfileLink variant={variant} />
        </li>
        <li
          className={cn(
            "flex items-center pl-6",
            variant === "main" && "text-black dark:text-white"
          )}
        >
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
