"use client";

import React from "react";
import JSONEditor from "../../editor/json-editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const CourseEditor = () => {
  return (
    <div className="relative flex size-full flex-col pt-5">
      <div className="px-3">
        <h3 className="h3-typography text-center font-bold">Course Editor</h3>
        <h6 className="h6-typography text-center text-muted-foreground">
          Edit and preview the source code of a course as JSON.
        </h6>
      </div>
      <Separator className="mt-3" />

      <ScrollArea className="size-full flex-1">
        <JSONEditor />
      </ScrollArea>
    </div>
  );
};

export default CourseEditor;
