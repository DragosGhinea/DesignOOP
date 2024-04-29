"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
  ReactFlowProvider,
  updateEdge,
  Connection,
} from "reactflow";

import "reactflow/dist/style.css";
import { sleep } from "@/utils/sleep-utils";
import PaneContextMenu, {
  PaneContextMenuInfo,
} from "./context-menu/pane-context-menu";
import NodeContextMenu, {
  NodeContextMenuInfo,
} from "./context-menu/node-context-menu";
import EdgeContextMenu, {
  EdgeContextMenuInfo,
} from "./context-menu/edge-context-menu";
import CodeNode from "./nodes/code-node";
import InformationNode from "./nodes/information-node";
import RichTextNode from "./nodes/rich-text-node";
import ImageNode from "./nodes/image-node";

const minimapStyle = {
  height: 120,
};

const initialNodes = [
  {
    id: "provider-1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  { id: "provider-2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "provider-3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  { id: "provider-4", data: { label: "Node 4" }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  {
    id: "provider-e1-2",
    source: "provider-1",
    target: "provider-2",
    animated: true,
  },
  { id: "provider-e1-3", source: "provider-1", target: "provider-3" },
];

const nodeTypes = {
  code: CodeNode,
  information: InformationNode,
  "rich-text": RichTextNode,
  image: ImageNode,
};

export type GraphicStateEditorExtraConfig = {
  snapToGrid: boolean;
};

const GraphicStateEditorInternal = () => {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [extraConfig, setExtraConfig] = useState<GraphicStateEditorExtraConfig>(
    {
      snapToGrid: false,
    }
  );
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [paneContextMenuInfo, setPaneContextMenuInfo] =
    useState<PaneContextMenuInfo>();
  const [nodeContextMenuInfo, setNodeContextMenuInfo] =
    useState<NodeContextMenuInfo>();
  const [edgeContextMenuInfo, setEdgeContextMenuInfo] =
    useState<EdgeContextMenuInfo>();

  const ensureClosedContextMenu = () => {
    setPaneContextMenuInfo(undefined);
    setNodeContextMenuInfo(undefined);
    setEdgeContextMenuInfo(undefined);
  };

  const handlePaneContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    ensureClosedContextMenu();
    // if it doesn't sleep, although the trigger position changes
    // the dropdown menu itself will remain in the old place
    sleep(70).then(() => {
      setPaneContextMenuInfo({
        left: event.clientX,
        top: event.clientY,
        flowPosition: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
      });
    });
  };

  const handleNodeContextMenu = (event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    ensureClosedContextMenu();
    sleep(70).then(() => {
      setNodeContextMenuInfo({
        left: event.clientX,
        top: event.clientY,
        flowPosition: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        node,
      });
    });
  };

  const handleEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => {
    event.preventDefault();
    ensureClosedContextMenu();
    sleep(70).then(() => {
      setEdgeContextMenuInfo({
        left: event.clientX,
        top: event.clientY,
        edge,
      });
    });
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      snapToGrid={extraConfig.snapToGrid}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onConnect={onConnect}
      onPaneContextMenu={handlePaneContextMenu}
      onNodeContextMenu={handleNodeContextMenu}
      onEdgeContextMenu={handleEdgeContextMenu}
      proOptions={{ hideAttribution: true }}
      fitView
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />

      <PaneContextMenu
        extraConfig={extraConfig}
        setExtraConfig={setExtraConfig}
        paneContextMenuInfo={paneContextMenuInfo}
        setPaneContextMenuInfo={setPaneContextMenuInfo}
      />
      <NodeContextMenu
        nodeContextMenuInfo={nodeContextMenuInfo}
        setNodeContextMenuInfo={setNodeContextMenuInfo}
      />
      <EdgeContextMenu
        edgeContextMenuInfo={edgeContextMenuInfo}
        setEdgeContextMenuInfo={setEdgeContextMenuInfo}
      />
    </ReactFlow>
  );
};

const GraphicStateEditor = () => {
  return (
    <ReactFlowProvider>
      <GraphicStateEditorInternal />
    </ReactFlowProvider>
  );
};

export default GraphicStateEditor;
