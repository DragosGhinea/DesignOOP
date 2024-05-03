"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SWRKey } from "@/modules/users/components/session/session-swr-config";
import { TODO } from "@/types/todo";
import { WindIcon } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { CoursesPage } from "../../types/course";

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

const CourseResult = ({ result }: { result: TODO }) => {
  return <Card className="p-5">Course Result {result}</Card>;
};

const Results = ({ results }: { results: CoursesPage }) => {
  return (
    <ScrollArea className="mt-10 size-full flex-1 p-3 [&>div>div]:size-full">
      <div className="grid size-full flex-1 grid-cols-[repeat(auto-fill,_200px)] flex-col items-center justify-center gap-5">
        {results.content.map((result: TODO, index: number) => (
          // <CourseResult key={result.id} result={result} />
          <div key={index}>{JSON.stringify(result)}</div>
        ))}
      </div>
    </ScrollArea>
  );
};

const SearchResultsList = ({ search }: { search: string | undefined }) => {
  const key: SWRKey = {
    tags: ["courses", "search-courses"],
    url: search ? `/v1/courses?search=${search}` : "/v1/courses",
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
    return <div>Loading...</div>;
  }

  return searchResults.content.length > 0 ? (
    <Results results={searchResults} />
  ) : (
    <NoResults search={search} />
  );
};

export default SearchResultsList;
