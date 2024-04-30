"use client";

import React, { useCallback, useId, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowJsonObject,
} from "reactflow";

import "reactflow/dist/style.css";
import CodeNode from "./nodes/render/code-node";
import InformationNode from "./nodes/render/information-node";
import RichTextNode from "./nodes/render/rich-text-node";
import ImageNode from "./nodes/render/image-node";

const minimapStyle = {
  height: 120,
};

const nodeTypes = {
  code: CodeNode,
  information: InformationNode,
  "rich-text": RichTextNode,
  image: ImageNode,
};

const GraphicStateDisplay = ({
  restoreDataJson,
}: {
  restoreDataJson?: ReactFlowJsonObject<any, any>;
}) => {
  const reactFlowId = useId();
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(
    restoreDataJson?.nodes || []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    restoreDataJson?.edges || []
  );
  const [prevRestoreDataJson, setPrevRestoreDataJson] =
    useState(restoreDataJson);
  if (restoreDataJson !== prevRestoreDataJson) {
    setNodes(restoreDataJson?.nodes || []);
    setEdges(restoreDataJson?.edges || []);
    setPrevRestoreDataJson(restoreDataJson);
  }

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <ReactFlow
        contentEditable={false}
        id={reactFlowId}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default GraphicStateDisplay;
