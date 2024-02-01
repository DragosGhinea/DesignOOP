import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const LoginNavbar = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-5 px-6 sm:px-12">
      <Link
        href="/"
        className="h2-bold flex items-center gap-1 transition-colors hover:text-dark-500 dark:text-light-700"
      >
        <Image
          src="/assets/images/logo.png"
          width={80}
          height={80}
          alt="logo"
        />
        DesignOOP
      </Link>
      <ul className="flex items-center justify-around">
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
};

export default LoginNavbar;
