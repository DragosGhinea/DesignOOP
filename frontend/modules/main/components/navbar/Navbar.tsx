import Link from "next/link";
import React from "react";

// absolute top-0 z-50 flex w-[100px] items-center gap-5 bg-light-900 p-6 shadow-light-300 dark:bg-dark-200 dark:shadow-none sm:px-12"
const Navbar = () => {
  return (
    <div className="absolute top-0 z-[150] inline-block h-[500px] bg-red-500">
      <Link href="/" className="base-bold inline-block">
        DesignOOP
      </Link>
      {/* <ul></ul> */}
    </div>
  );
};

export default Navbar;
