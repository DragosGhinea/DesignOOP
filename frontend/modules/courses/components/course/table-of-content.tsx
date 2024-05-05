"use client";

import React from "react";
import { extractTableOfContentsFromJSON } from "../../utils/table-of-contents";
import { NotebookTextIcon } from "lucide-react";
import { CourseType } from "./course";

const TableOfContent = ({ courseJson }: { courseJson: CourseType }) => {
  const result: { title: string; id: string; depth: number }[] = [];
  extractTableOfContentsFromJSON(courseJson, result);

  const handleClick = (id: string) => () => {
    console.log("CLICKED", id)
    // const wrapper = document.getElementById("course-scroll-wrapper");
    const target = document.getElementById(id);
    if (!target) return;

    console.log(target);
    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  return (
    <div className="flex w-full flex-col pl-8">
      <div className="h4-typography relative text-ellipsis text-nowrap pl-10 font-bold">
        <div className="absolute -top-1 left-[-26px] rounded-full bg-muted p-2">
          <NotebookTextIcon className="size-10" />
        </div>
        Table of Contents
      </div>
      <div className="h-6 border-l-[5px]" />
      {result.map((content) => {
        return (
          <div
            onClick={handleClick(content.id)}
            key={content.id}
            style={{
              paddingLeft: content.depth * 15 + 20,
              borderLeftWidth: content.depth * 5 + 5,
            }}
            className="h5-typography cursor-pointer text-ellipsis text-nowrap rounded-r-sm py-2 transition-colors hover:bg-blue-100 active:bg-blue-200 dark:hover:bg-blue-800 dark:active:bg-blue-700"
          >
            {content.title}
          </div>
        );
      })}
    </div>
  );
};

export default TableOfContent;
