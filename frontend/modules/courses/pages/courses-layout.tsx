"use client";

import { ResizablePanelGroup } from "@/components/ui/resizable";
import React, { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";
import CourseJSONProvider from "../context/course-json-provider";

const CoursesLayout = ({
  desktopAddition,
  mobileAddition,
}: {
  desktopAddition: ReactNode;
  mobileAddition: ReactNode;
}) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:courses-layout=${JSON.stringify(sizes)}; path=/`;
  };

  return (
    <main className="relative flex size-full flex-col bg-light-850 dark:bg-dark-300">
      <Navbar />
      <CourseJSONProvider>
        <div className="hidden overflow-hidden lg:block">
          <ResizablePanelGroup direction="horizontal" onLayout={onLayout}>
            {desktopAddition}
          </ResizablePanelGroup>
        </div>

        {mobileAddition}
      </CourseJSONProvider>
    </main>
  );
};

export default CoursesLayout;
