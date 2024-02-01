import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ProfileLink from "@/modules/main/components/navbar/ProfileLink";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-5 px-6 sm:px-12">
      <Link
        href="/"
        className="h2-bold flex items-center gap-1 text-light-700 transition-colors hover:text-dark-500"
      >
        <Image
          src="/assets/images/logo.png"
          width={80}
          height={80}
          alt="logo"
        />
        DesignOOP
      </Link>
      <ul className="flex min-w-[40%] items-center justify-around">
        <li>
          <Link
            href="/courses"
            className="base-semibold p-6 leading-[3.5rem] text-light-700 transition-colors hover:text-dark-500"
          >
            Courses
          </Link>
        </li>
        <li>
          <Link
            href="/quizzes"
            className="base-semibold p-6 leading-[3.5rem] text-light-700 transition-colors hover:text-dark-500"
          >
            Quizzes
          </Link>
        </li>
        <li>
          <ProfileLink />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
