"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import React, { ReactNode } from "react";
import LeftSidebar from "@/modules/courses/components/sidebar/LeftSidebar";
import Navbar from "@/modules/courses/components/navbar/Navbar";

const CoursesLayoutClient = ({
  children,
  defaultLayout = [20, 60, 20],
}: {
  children: ReactNode;
  defaultLayout: number[] | undefined;
}) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:courses-layout=${JSON.stringify(sizes)}`;
  };

  return (
    <main className="relative flex size-full flex-col bg-light-850 dark:bg-dark-300">
      <Navbar />
      <ResizablePanelGroup direction="horizontal" onLayout={onLayout}>
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={7}
          maxSize={30}
          style={{ overflow: "visible" }}
        >
          <LeftSidebar />
        </ResizablePanel>
        {/* static is required for tooltip to show above */}
        <ResizableHandle className="static" />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>Three</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default CoursesLayoutClient;
