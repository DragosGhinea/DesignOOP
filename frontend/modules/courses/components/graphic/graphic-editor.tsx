"use client";

import React from "react";
import GraphicStateEditor from "./graphic-state-editor";
import { ReactFlowJsonObject, ReactFlowProvider } from "reactflow";

const GraphicEditor = ({
  dataJson,
  onSave,
  onChange,
}: {
  dataJson?: ReactFlowJsonObject<any, any>;
  onSave?: (data: ReactFlowJsonObject<any, any>) => void;
  onChange?: (data: ReactFlowJsonObject<any, any>) => void;
}) => {
  return (
    <div className="flex size-full flex-col">
      <ReactFlowProvider>
        <GraphicStateEditor
          restoreDataJson={dataJson}
          onSave={onSave}
          onChange={onChange}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphicEditor;
