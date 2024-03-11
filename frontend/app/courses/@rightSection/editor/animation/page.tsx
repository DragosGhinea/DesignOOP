import { ResizablePanel } from "@/components/ui/resizable";
import { cookies } from "next/headers";
import React from "react";

const RightSection = () => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayout = layout ? JSON.parse(layout.value)[2] : 20;

  return (
    <ResizablePanel defaultSize={defaultLayout} minSize={7} maxSize={50}>
      Test2
    </ResizablePanel>
  );
};

export default RightSection;
