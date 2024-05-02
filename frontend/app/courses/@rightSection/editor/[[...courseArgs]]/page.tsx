import CourseEditorPreview from "@/modules/courses/components/sections/right/course-editor-preview";
import CourseEditorPreviewFull from "@/modules/courses/components/sections/right/course-editor-preview-full";

import React from "react";

const page = () => {
  return (
    <div className="relative size-full overflow-hidden">
      <CourseEditorPreviewFull content={<CourseEditorPreview />} />
      <CourseEditorPreview />
    </div>
  );
};

export default page;
