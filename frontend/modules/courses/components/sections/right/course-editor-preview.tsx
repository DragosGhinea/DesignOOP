"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import Course, { CourseType } from "../../course/course";
import useCourseJSON from "@/modules/courses/hooks/use-course-json";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseEditorPreview = () => {
  const { courseJSON } = useCourseJSON();
  const jsonData = courseJSON ?? {};

  return (
    <div className="relative flex size-full flex-col pt-5">
      <div className="px-3">
        <h3 className="h3-typography text-center font-bold">Preview</h3>
        <h6 className="h6-typography text-center text-muted-foreground">
          The computed course will be displayed here.
        </h6>
      </div>
      <Separator className="mt-3" />
      <ScrollArea className="size-full flex-1 pt-10">
        <Course jsonData={jsonData as CourseType} />
      </ScrollArea>
    </div>
  );
};

export default CourseEditorPreview;
