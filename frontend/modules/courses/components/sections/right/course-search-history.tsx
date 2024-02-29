"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layers3Icon, ScanSearchIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const NoSearches = () => {
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <div className="inline-block rounded-full bg-light-700 p-10 dark:bg-dark-500">
        <Layers3Icon className="size-10" />
      </div>
      <span className="small-typography font-semibold text-muted-foreground">
        No search history found.
      </span>
    </div>
  );
};

const Searches = ({
  searches,
  setSearches,
}: {
  searches: string[];
  setSearches: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) params.delete(name);
      else params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Button
        className="small-typography mb-2"
        size="sm"
        onClick={() => setSearches([])}
      >
        Clear history
      </Button>
      <small className="small-typography mb-5 font-semibold text-muted-foreground">
        Click any of the searches below to use them again.
      </small>
      {/* [&>div>div]:!block required so it will respect w-full */}
      <ScrollArea className="self-stretch [&>div>div]:!block">
        <div className="relative mx-3 flex flex-col-reverse gap-5 overflow-hidden">
          {searches?.map((search, index) => {
            return (
              <div
                onClick={() => {
                  router.replace(
                    pathname + "?" + createQueryString("search", search)
                  );
                }}
                key={search}
                className="p-typography flex cursor-pointer items-center gap-3 rounded-md border-2 bg-light-800 p-3 font-semibold transition-[border] hover:border-2 hover:border-blue-300 dark:bg-dark-100 dark:hover:border-blue-800"
              >
                <div>
                  <ScanSearchIcon className="size-10" />
                </div>
                <div className="flex-1 overflow-hidden text-ellipsis">
                  {search}
                </div>
                <div
                  className="underline-animated relative text-muted-foreground before:hover:scale-x-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearches((prevSearches) =>
                      prevSearches.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Remove
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

const CourseSearchHistory = () => {
  const [searches, setSearches] = useLocalStorage<string[]>(
    "course-searches",
    [],
    {
      initializeWithValue: false,
    }
  );

  return (
    <div className="flex size-full flex-col items-center p-10">
      <h5 className="h5-typography mb-5 text-nowrap font-bold">
        Latest searches
      </h5>
      {searches && searches.length > 0 ? (
        <Searches searches={searches} setSearches={setSearches} />
      ) : (
        <NoSearches />
      )}
    </div>
  );
};

export default CourseSearchHistory;
