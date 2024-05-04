"use client";

import { CourseType } from "@/modules/courses/components/course/course";
import TableOfContent from "@/modules/courses/components/course/table-of-content";
import CourseEditorPreview from "@/modules/courses/components/sections/right/course-editor-preview";
import CourseEditorPreviewFull from "@/modules/courses/components/sections/right/course-editor-preview-full";
import CourseEditorPreviewTable from "@/modules/courses/components/sections/right/course-editor-preview-table";
import useCourseJSON from "@/modules/courses/hooks/use-course-json";

import React from "react";

const Page = () => {
  const { inEditCourseJSON } = useCourseJSON();

  return (
    <div className="relative size-full overflow-hidden">
      <CourseEditorPreviewFull content={<CourseEditorPreview />} />
      <CourseEditorPreviewTable
        content={<TableOfContent courseJson={inEditCourseJSON as CourseType} />}
      />
      <CourseEditorPreview />
    </div>
  );
};

export default Page;
