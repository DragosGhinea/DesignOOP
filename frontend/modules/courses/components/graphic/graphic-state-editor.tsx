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
import GraphicLoadModal from "./graphic-load-modal";
import { triggerDownload } from "../../utils/json-download";
import { toast } from "sonner";

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

  const getFormattedData = () => {
    const data = instance.toObject();
    const crushed = JSONCrush.crush(JSON.stringify(data));
    return convertStringToBase64(crushed);
  };

  const handleSave = () => {
    const data = getFormattedData();
    navigator.clipboard.writeText(data);

    toast.success("Graphic copied to clipboard");

    if (onSave) onSave(instance.toObject());
  };

  const handleDownload = () => {
    const data = getFormattedData();
    triggerDownload(data, "graphic.txt");

    toast.success("Graphic downloaded");

    if (onSave) onSave(instance.toObject());
  };

  const restoreData = (data: ReactFlowJsonObject<any, any>) => {
    instance.setNodes(data?.nodes || []);
    instance.setEdges(data?.edges || []);

    toast.success("Graphic loaded");
  };

  return (
    <Panel position="top-left">
      <Card className="flex gap-2 p-4">
        <Button onClick={handleSave} variant="success">
          Copy to clipboard
        </Button>
        <Button onClick={handleDownload} variant="outline">
          Download txt
        </Button>
        <GraphicLoadModal
          trigger={<Button>Load from text</Button>}
          setGraphic={restoreData}
        />
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
