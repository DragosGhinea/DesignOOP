import React from "react";
import SearchInput from "../search/search-input";

const CourseSearchAndFilter = () => {
  return (
    <div className="flex size-full flex-col items-center p-10">
      <h1 className="h1-typography">Courses</h1>
      <p className="h6-typography mb-20 mt-3 font-semibold text-muted-foreground">
        Use the search bar below to find courses based on title, description, or
        content.
      </p>
      <SearchInput className="w-[60%] min-w-80" />
    </div>
  );
};

export default CourseSearchAndFilter;
