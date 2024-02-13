import React from "react";
import SearchInput from "../search/search-input";

const CourseSearchAndFilter = () => {
  return (
    <div className="flex size-full flex-col items-center p-10">
      <h1 className="text-6xl">Courses</h1>
      <p className="mb-20 mt-3 text-lg font-semibold text-muted-foreground">
        Use the search bar below to find courses based on title, description, or
        content.
      </p>
      <SearchInput className="w-[60%] min-w-80" />
    </div>
  );
};

export default CourseSearchAndFilter;
