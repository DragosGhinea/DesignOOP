import { ResizablePanel } from "@/components/ui/resizable";
import CourseEditorPreview from "@/modules/courses/components/sections/right/course-editor-preview";
import { cookies } from "next/headers";
import React from "react";

const RightSection = () => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayout = layout ? JSON.parse(layout.value)[2] : 20;

  return (
    <ResizablePanel defaultSize={defaultLayout} minSize={7} maxSize={50}>
      <CourseEditorPreview />
    </ResizablePanel>
  );
};

export default RightSection;
