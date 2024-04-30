"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import GraphicStateDisplay from "../../graphic/graphic-state-display";
import { ReactFlowProvider } from "reactflow";
import { Button } from "@/components/ui/button";
import GraphicLoadModal from "../../graphic/graphic-load-modal";

const CourseGraphicPreview = () => {
  const [graphic, setGraphic] = useState<JSON | undefined>(undefined);

  return (
    <div className="relative flex size-full flex-col pt-5">
      <div className="px-3">
        <h3 className="h3-typography text-center font-bold">Preview</h3>
      </div>
      <GraphicLoadModal
        trigger={<Button className="mx-3">Load graphic from text</Button>}
        setGraphic={setGraphic}
      />
      <Separator className="mt-3" />

      <ReactFlowProvider>
        <GraphicStateDisplay restoreDataJson={graphic as any} />
      </ReactFlowProvider>
    </div>
  );
};

export default CourseGraphicPreview;
