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

  const debouncedSearch = useDebounceCallback((search, isValid) => {
    if (isValid)
      router.replace(
        pathname + "?" + createQueryString("search", search.trim())
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, search]);

  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        onChange={(e) => {
          debouncedSearch(e.target.value, e.target.validity.valid);
        }}
        pattern="[\w\- ]*"
        ref={searchInput}
        placeholder="Search"
        type="text"
        className="h6-typography peer w-full border-b-4 border-blue-200 bg-transparent py-1 pl-12 transition-colors placeholder:text-transparent valid:text-blue-600 invalid:border-red-200 invalid:text-red-500 focus:outline-none focus:placeholder:text-blue-400 valid:focus:border-blue-500 invalid:focus:border-red-500 dark:border-blue-400 dark:text-blue-200 invalid:dark:border-red-400 invalid:dark:text-red-200 dark:focus:border-blue-300 dark:focus:placeholder:text-blue-200 invalid:dark:focus:border-red-300"
        autoComplete="off"
      />

      <div className="absolute -bottom-7 hidden overflow-hidden text-ellipsis text-nowrap text-red-600 peer-invalid:block">
        Only letters, numbers, dashes and spaces allowed.
      </div>

      <div className="h6-typography pointer-events-none invisible absolute bottom-2 left-12 transition-all duration-300 peer-placeholder-shown:visible peer-valid:text-blue-400 peer-invalid:text-red-400 peer-focus:opacity-0 dark:text-blue-200 peer-invalid:dark:text-red-200">
        Search:{" "}
        <TypeAnimation
          cursor={false}
          sequence={["Singleton", 1000, "Observer Pattern", 1000]}
          repeat={Infinity}
          className="font-bold"
        />
      </div>

      <div className="pointer-events-none absolute bottom-2 text-blue-400 peer-invalid:text-red-700 peer-valid:peer-focus:text-blue-700 dark:peer-focus:text-blue-200 peer-invalid:dark:peer-focus:text-red-200">
        <SearchIcon className="size-8" />
      </div>
    </div>
  );
};

export default SearchInput;
