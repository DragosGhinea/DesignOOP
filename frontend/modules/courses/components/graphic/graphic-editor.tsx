"use client";

import React from "react";
import GraphicStateEditor from "./graphic-state-editor";
import { ReactFlowJsonObject, ReactFlowProvider } from "reactflow";

const GraphicEditor = ({
  dataJson,
}: {
  dataJson?: ReactFlowJsonObject<any, any>;
}) => {
  return (
    <div className="flex size-full flex-col">
      <ReactFlowProvider>
        <GraphicStateEditor restoreDataJson={dataJson} />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphicEditor;
