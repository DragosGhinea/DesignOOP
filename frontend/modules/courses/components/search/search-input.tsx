"use client";

import { cn } from "@/utils/common";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useDebounceCallback } from "usehooks-ts";

const SearchInput = ({ className }: { className?: string }) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedSearch = useDebounceCallback((e) => {
    router.replace(
      pathname + "?" + createQueryString("search", e.target.value.trim())
    );
  }, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) params.delete(name);
      else params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const search = searchParams.get("search") ?? "";

  useEffect(() => {
    if (searchInput.current && search) {
      searchInput.current.value = search;
      // const str = searchInput.current.value;

      // setSearches((oldSearches) => {
      //   const searchesCopy = [...oldSearches];
      //   const index = searchesCopy.indexOf(str);
      //   if (index > -1) {
      //     searchesCopy.splice(index, 1);
      //   }
      //   searchesCopy.push(str);
      //   if (searchesCopy.length > 10) {
      //     searchesCopy.shift();
      //   }

      //   return searchesCopy;
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, search]);

  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        onChange={(e) => {
          debouncedSearch(e);
        }}
        ref={searchInput}
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
