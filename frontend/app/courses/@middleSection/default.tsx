import CourseSearch from "@/modules/courses/components/sections/middle/course-search";

import React from "react";

const MiddleSection = ({
  searchParams: { search },
}: {
  searchParams: { search?: string };
}) => {
  return <CourseSearch search={search} />;
};

export default MiddleSection;
