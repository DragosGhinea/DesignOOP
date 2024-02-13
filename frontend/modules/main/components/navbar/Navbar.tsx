import { ThemeToggle } from "@/components/shared/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";
import ProfileLink from "@main/components/navbar/profile-link";

const UnderlineAnimated = ({ children }: { children: ReactNode }) => {
  return <span className="underline-animated relative">{children}</span>;
};

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-5 px-6 text-light-700 sm:px-12">
      <Link
        href="/"
        className="h2-bold flex items-center gap-1 transition-colors hover:text-dark-500 dark:hover:text-blue-300 [&_span]:before:hover:scale-x-100"
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
            className="base-semibold p-6 transition-colors hover:text-dark-500 dark:hover:text-blue-300 [&_span]:before:hover:scale-x-100"
          >
            <UnderlineAnimated>Courses</UnderlineAnimated>
          </Link>
        </li>
        <li>
          <Link
            href="/quizzes"
            className="base-semibold p-6 transition-colors hover:text-dark-500 dark:hover:text-blue-300 [&_span]:before:hover:scale-x-100"
          >
            <UnderlineAnimated>Quizzes</UnderlineAnimated>
          </Link>
        </li>
        <li>
          <ProfileLink />
        </li>
        <li className="flex items-center pl-6 text-black dark:text-white">
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
