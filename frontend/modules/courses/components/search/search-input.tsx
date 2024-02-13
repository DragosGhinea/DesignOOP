import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchInput = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        type="text"
        placeholder="Search"
        className="h3-semibold peer w-full border-b-4 border-blue-200 py-1 pb-2 pl-12 text-blue-600 transition-colors placeholder:text-blue-400 focus:border-blue-500 focus:outline-none"
        autoComplete="off"
      />

      <div className="pointer-events-none absolute bottom-2 text-blue-400 peer-focus:text-blue-700">
        <SearchIcon className="size-8" />
      </div>
    </div>
  );
};

export default SearchInput;
