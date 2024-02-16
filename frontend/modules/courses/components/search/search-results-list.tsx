import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TODO } from "@/types/todo";
import { WindIcon } from "lucide-react";
import React from "react";

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

const Results = ({ results }: { results: TODO }) => {
  return (
    <ScrollArea className="mt-10 size-full flex-1 p-3 [&>div>div]:size-full">
      <div className="grid size-full flex-1 grid-cols-[repeat(auto-fill,_200px)] flex-col items-center justify-center gap-5">
        {Array.from({ length: 110 }).map((_, i) => (
          <CourseResult key={i} result={i} />
        ))}
      </div>
    </ScrollArea>
  );
};

const SearchResultsList = ({ search }: { search: string | undefined }) => {
  const searchResults: TODO = [];

  return searchResults.length >= 0 ? (
    <Results results={searchResults} />
  ) : (
    <NoResults search={search} />
  );
};

export default SearchResultsList;
