"use client";

import React from "react";
import GraphicStateEditor from "./graphic-state-editor";
import { ReactFlowProvider } from "reactflow";

const GraphicEditor = () => {
  return (
    <div className="flex size-full flex-col">
      <ReactFlowProvider>
        <GraphicStateEditor onSave={() => {}}/>
      </ReactFlowProvider>
    </div>
  );
};

export default GraphicEditor;
