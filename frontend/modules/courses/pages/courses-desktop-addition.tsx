import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const CoursesDesktopAddition = ({
  leftSection,
  middleSection,
  rightSection,
}: {
  leftSection: ReactNode;
  middleSection: ReactNode;
  rightSection: ReactNode;
}) => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayoutLeft = layout ? JSON.parse(layout.value)[0] : 20;
  const defaultLayoutMiddle = layout ? JSON.parse(layout.value)[1] : 60;
  const defaultLayoutRight = layout ? JSON.parse(layout.value)[2] : 20;

  return (
    <>
      <ResizablePanel
        defaultSize={defaultLayoutLeft}
        minSize={7}
        maxSize={30}
        style={{ overflow: "visible" }}
        className="z-50 hidden lg:block"
      >
        {leftSection}
      </ResizablePanel>

      {/* static is required for tooltip to show above */}
      <ResizableHandle className="static hidden lg:block" />

      <ResizablePanel defaultSize={defaultLayoutMiddle}>
        {middleSection}
      </ResizablePanel>

      <ResizableHandle className="hidden lg:block" />

      <ResizablePanel
        defaultSize={defaultLayoutRight}
        minSize={7}
        maxSize={50}
        className="hidden lg:block"
      >
        {rightSection}
      </ResizablePanel>
    </>
  );
};

export default CoursesDesktopAddition;
