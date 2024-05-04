"use client";

import React from "react";
import { extractTableOfContentsFromJSON } from "../../utils/table-of-contents";
import { NotebookTextIcon } from "lucide-react";
import { CourseType } from "./course";

const TableOfContent = ({ courseJson }: { courseJson: CourseType }) => {
  const result: { title: string; id: string; depth: number }[] = [];
  extractTableOfContentsFromJSON(courseJson, result);

  return (
    <div className="ml-3 flex w-full flex-col">
      <div className="h4-typography relative text-ellipsis text-nowrap pl-10 font-bold">
        <div className="absolute -top-1 left-[-26px] rounded-full bg-muted p-2">
          <NotebookTextIcon className="size-10" />
        </div>
        Table of Content
      </div>
      <div className="h-6 border-l-[5px]" />
      {result.map((content) => {
        return (
          <div
            key={content.id}
            style={{
              paddingLeft: content.depth * 15 + 20,
              borderLeftWidth: content.depth * 5 + 5,
            }}
            className="h5-typography cursor-pointer text-ellipsis text-nowrap rounded-r-sm py-2 transition-colors hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            {content.title}
          </div>
        );
      })}
    </div>
  );
};

export default TableOfContent;
