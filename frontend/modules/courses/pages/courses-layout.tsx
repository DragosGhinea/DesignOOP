"use client";

import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import React, { ReactNode } from "react";
import Navbar from "@/modules/courses/components/navbar/navbar";
import CourseJSONProvider from "../context/course-json-provider";

const CoursesLayout = ({
  leftSection,
  rightSection,
  middleSection,
}: {
  leftSection: ReactNode;
  rightSection: ReactNode;
  middleSection: ReactNode;
}) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:courses-layout=${JSON.stringify(sizes)}; path=/`;
  };

  return (
    <main className="relative flex size-full flex-col bg-light-850 dark:bg-dark-300">
      <Navbar />
      <ResizablePanelGroup direction="horizontal" onLayout={onLayout}>
        <CourseJSONProvider>
          {leftSection}
          {/* static is required for tooltip to show above */}
          <ResizableHandle className="static" />
          {middleSection}
          <ResizableHandle />
          {rightSection}
        </CourseJSONProvider>
      </ResizablePanelGroup>
    </main>
  );
};

export default CoursesLayout;
