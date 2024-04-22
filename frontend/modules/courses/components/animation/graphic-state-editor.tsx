"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import "reactflow/dist/style.css";

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

const GraphicStateEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [paneContextMenuOpen, setPaneContextMenuOpen] = React.useState(false);

  // const state = useStoreApi().getState();
  // console.log(state);

  return (
      <div className="h-[90%]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // onPaneContextMenu={(event) => console.log("Pane context menu", event)}
          // onNodeContextMenu={(event) => console.log("Node context menu", event)}
          // onPaneClick={(event) => console.log("Pane clicked", event)}
          proOptions={{ hideAttribution: true }}
          // fitView
        >
          <MiniMap style={minimapStyle} zoomable pannable />
          <Controls />
          <Background color="#aaa" gap={16} />
          {/* <DropdownMenu>
            <DropdownMenuContent className="w-64">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger inset>Create</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-48">
                  <DropdownMenuItem>Code Node</DropdownMenuItem>
                  <DropdownMenuItem>Information Node</DropdownMenuItem>
                  <DropdownMenuItem>Comment Node</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </ReactFlow>
      </div>
  );
};

export default GraphicStateEditor;
