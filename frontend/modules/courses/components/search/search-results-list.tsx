"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SWRKey } from "@/modules/users/components/session/session-swr-config";
import {
  BookOpenIcon,
  GraduationCapIcon,
  NotebookTextIcon,
  PackageSearchIcon,
  WindIcon,
} from "lucide-react";
import React from "react";
import useSWR from "swr";
import { Course, CoursesPage } from "../../types/course";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { getCoursesUrl } from "@/utils/backend-utils";

const NoResults = ({ search }: { search: string | undefined }) => {
  return (
    <div className="mt-10 flex w-full flex-1 flex-col items-center justify-center gap-5">
      <div className="inline-block rounded-full bg-light-700 p-10 dark:bg-dark-500">
        <WindIcon className="size-20" />
      </div>
      <h6 className="h6-typography">
        Nothing matched your search{search && <b>{` '${search}'`}</b>}.
      </h6>
    </div>
  );
};

const CourseResult = ({ result }: { result: Course }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${result.id}`);
  };

  return (
    <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl p-[2px]">
      <Card
        className="peer z-10 flex size-full cursor-pointer flex-col gap-3 p-5"
        onClick={handleClick}
      >
        <div className="grid h-[110px] grid-cols-6 gap-2">
          <div className="col-span-1 flex items-center justify-center">
            <GraduationCapIcon className="size-12" />
          </div>
          <div className="h4-typography col-span-5 flex items-center font-bold">
            {result.title}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <BookOpenIcon className="size-6" />
          </div>
          <div className="h6-typography col-span-5 flex items-center text-muted-foreground">
            {result.subtitle}
          </div>
        </div>

        <Separator className="mb-3 mt-4 flex h-[2px] items-center justify-center">
          <div className="inline rounded-full bg-muted p-2">
            <NotebookTextIcon className="size-6" />
          </div>
        </Separator>

        <ScrollArea className="">
          <div className="max-h-[75px]">{result.description}</div>
        </ScrollArea>

        <Separator className="my-2 h-[2px]" />

        <ScrollArea className="h-24">
          <div className="flex flex-wrap items-center gap-1">
            {result.tags.map((tag: string) => (
              <Badge key={tag} className="rounded-[5px] dark:bg-light-700">
                {tag}
              </Badge>
            ))}
          </div>
        </ScrollArea>

        {result.textSearchScore && (
          <div className="absolute bottom-4 right-6 z-30 flex items-center gap-2">
            <PackageSearchIcon />
            <Tooltip>
              <TooltipTrigger className="font-bold">
                {result.textSearchScore.toFixed(2)} Score
              </TooltipTrigger>
              <TooltipContent className="z-20 w-52" side="left">
                The score is based on how well the course matches the search
                criteria.
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </Card>
      <div className="absolute inset-0 left-[-25%] top-[-25%] size-[150%] animate-border-spin rounded-sm bg-[conic-gradient(#0ea5e9_0deg,#0ea5e9_0deg,transparent_80deg)] opacity-0 transition-opacity peer-hover:opacity-100" />
    </div>
  );
};

const Results = ({ results }: { results: CoursesPage }) => {
  return (
    <ScrollArea className="mt-10 size-full flex-1 p-3 [&>div>div]:size-full">
      <div className="grid size-full flex-1 grid-cols-[repeat(auto-fill,_400px)] flex-col items-stretch justify-center gap-5">
        {results.content.map((result: Course) => (
          <CourseResult key={result.id} result={result} />
        ))}
      </div>
    </ScrollArea>
  );
};

const SearchResultsList = ({ search }: { search: string | undefined }) => {
  const key: SWRKey = {
    tags: ["courses", "search-courses"],
    url: search
      ? `${getCoursesUrl()}/v1/courses?search=${search}`
      : `${getCoursesUrl()}/v1/courses`,
    headers: {
      "X-FETCH-WITHOUT-COMPONENTS": "true",
    },
  };
  const { data: searchResults, isLoading: loadingSearch } = useSWR(key, {
    fallbackData: {
      content: [],
      pageSize: 0,
      pageNumber: 0,
      totalPages: -1,
    },
  });

  if (loadingSearch) {
    return <LoadingSpinner variant="large" text="Loading courses..." />;
  }

  return searchResults.content.length > 0 ? (
    <Results results={searchResults} />
  ) : (
    <NoResults search={search} />
  );
};

export default SearchResultsList;
