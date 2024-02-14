import { ThemeToggle } from "@/components/shared/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";
import ProfileLink from "@/modules/courses/components/navbar/profile-link";

const UnderlineAnimated = ({ children }: { children: ReactNode }) => {
  return <span className="underline-animated relative">{children}</span>;
};

const Navbar = () => {
  return (
    <div className="z-50 flex w-full items-center justify-between gap-5 px-6 text-dark-500 shadow-md dark:border-b-2 dark:text-light-700 dark:shadow-none sm:px-12">
      <Link
        href="/"
        className="h5-typography relative flex items-center gap-1 font-bold [&_span]:before:hover:scale-x-100"
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
            className="p-typography p-6 font-semibold [&_span]:before:hover:scale-x-100"
          >
            <UnderlineAnimated>Courses</UnderlineAnimated>
          </Link>
        </li>
        <li>
          <Link
            href="/quizzes"
            className="p-typography p-6 font-semibold [&_span]:before:hover:scale-x-100"
          >
            <UnderlineAnimated>Quizzes</UnderlineAnimated>
          </Link>
        </li>
        <li>
          <ProfileLink />
        </li>
        <li className="flex items-center pl-6">
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
