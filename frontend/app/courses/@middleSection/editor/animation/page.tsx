import { ResizablePanel } from "@/components/ui/resizable";
import { cookies } from "next/headers";

import React from "react";

const MiddleSection = () => {
  const layout = cookies().get("react-resizable-panels:courses-layout");
  const defaultLayout = layout ? JSON.parse(layout.value)[1] : 60;

  return (
    <ResizablePanel defaultSize={defaultLayout}>
      Test
    </ResizablePanel>
  );
};

export default MiddleSection;
