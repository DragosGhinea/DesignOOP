import { ResizablePanel } from "@/components/ui/resizable";
import CourseSearchHistory from "@/modules/courses/components/sections/right/course-search-history";
import { cookies } from "next/headers";
import React from "react";

const RightSection = () => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayout = layout ? JSON.parse(layout.value)[2] : 20;

  return (
    <ResizablePanel
      defaultSize={defaultLayout}
      minSize={7}
      maxSize={50}
      className="hidden lg:block"
    >
      <CourseSearchHistory />
    </ResizablePanel>
  );
};

export default RightSection;
