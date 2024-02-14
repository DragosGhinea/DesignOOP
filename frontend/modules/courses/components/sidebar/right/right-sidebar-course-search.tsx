"use client";

import { Layers3Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

const NoSearches = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-block rounded-full bg-light-700 p-10 dark:bg-dark-500">
        <Layers3Icon className="size-10" />
      </div>
      <span className="small-typography font-semibold text-muted-foreground">
        No search history found.
      </span>
    </div>
  );
};

const RightSidebarCourseSearch = () => {
  const searches = useReadLocalStorage<string[]>("course-searches", {
    initializeWithValue: false,
  });

  return (
    <div className="flex size-full flex-col items-center p-10">
      <h5 className="h5-typography mb-10 text-nowrap font-bold">
        Latest searches
      </h5>
      {searches && searches.length > 0 ? (
        searches?.map((search) => {
          return <div key={search}>{search}</div>;
        })
      ) : (
        <NoSearches />
      )}
    </div>
  );
};

export default RightSidebarCourseSearch;
