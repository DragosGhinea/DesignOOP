import { ResizablePanel } from "@/components/ui/resizable";
import CourseSearch from "@/modules/courses/components/sections/middle/course-search";
import { cookies } from "next/headers";

import React from "react";

const MiddleSection = ({
  searchParams: { search },
}: {
  searchParams: { search?: string };
}) => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayout = layout ? JSON.parse(layout.value)[1] : 60;

  return (
    <ResizablePanel defaultSize={defaultLayout}>
      <CourseSearch search={search} />
    </ResizablePanel>
  );
};

export default MiddleSection;
