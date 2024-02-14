"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const SearchInput = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        placeholder="Search"
        type="text"
        className="h6-typography peer w-full border-b-4 border-blue-200 bg-transparent py-1 pl-12 text-blue-600 transition-colors placeholder:text-transparent focus:border-blue-500 focus:outline-none focus:placeholder:text-blue-400 dark:border-blue-400 dark:text-blue-200 dark:focus:border-blue-300 dark:focus:placeholder:text-blue-200"
        autoComplete="off"
      />

      <div className="h6-typography pointer-events-none invisible absolute bottom-2 left-12 text-blue-400 transition-all duration-300 peer-placeholder-shown:visible peer-focus:opacity-0 dark:text-blue-200">
        Search:{" "}
        <TypeAnimation
          cursor={false}
          sequence={["Singleton", 1000, "Observer Pattern", 1000]}
          repeat={Infinity}
          className="font-bold"
        />
      </div>

      <div className="pointer-events-none absolute bottom-2 text-blue-400 peer-focus:text-blue-700 dark:peer-focus:text-blue-200">
        <SearchIcon className="size-8" />
      </div>
    </div>
  );
};

export default SearchInput;
