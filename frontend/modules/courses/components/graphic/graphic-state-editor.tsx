"use client";

import React, { useCallback, useId, useState } from "react";
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
  updateEdge,
  Connection,
  Panel,
  ReactFlowJsonObject,
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
import CodeNode from "./nodes/editor/code-node";
import InformationNode from "./nodes/editor/information-node";
import RichTextNode from "./nodes/editor/rich-text-node";
import ImageNode from "./nodes/editor/image-node";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertStringToBase64 } from "@/utils/base64";
import JSONCrush from "jsoncrush";

const minimapStyle = {
  height: 120,
};

const nodeTypes = {
  code: CodeNode,
  information: InformationNode,
  "rich-text": RichTextNode,
  image: ImageNode,
};

export type GraphicStateEditorExtraConfig = {
  snapToGrid: boolean;
};

const SaveRestorePanel = ({
  onSave,
}: {
  onSave?: (data: ReactFlowJsonObject<any, any>) => void;
}) => {
  const instance = useReactFlow();

  const handleSave = () => {
    const data = instance.toObject();
    console.log("DATA", data);
    console.log("CONVERTED", convertStringToBase64(JSON.stringify(data)));

    const crushed = JSONCrush.crush(JSON.stringify(data));
    console.log("CRUSHED", crushed);
    const base64 = convertStringToBase64(crushed);
    console.log("FINAL_CRUSHED", base64);

    if (onSave) onSave(data);
  };

  return (
    <Panel position="top-left">
      <Card className="p-4">
        <Button onClick={handleSave} variant="success">
          Save
        </Button>
      </Card>
    </Panel>
  );
};

const GraphicStateEditor = ({
  onSave,
  restoreDataJson,
}: {
  onSave?: (data: ReactFlowJsonObject<any, any>) => void;
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
    <>
      <ReactFlow
        id={reactFlowId}
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
        <SaveRestorePanel onSave={onSave} />

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
    </>
  );
};

export default GraphicStateEditor;
