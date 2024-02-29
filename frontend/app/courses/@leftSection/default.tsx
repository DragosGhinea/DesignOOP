import { ResizablePanel } from "@/components/ui/resizable";
import LeftSidebar from "@/modules/courses/components/sections/left/left-sidebar";
import { cookies } from "next/headers";
import React from "react";

const Default = () => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayout = layout ? JSON.parse(layout.value)[0] : 20;

  return (
    <ResizablePanel
      defaultSize={defaultLayout}
      minSize={7}
      maxSize={30}
      style={{ overflow: "visible" }}
    >
      <LeftSidebar />
    </ResizablePanel>
  );
};

export default Default;
