import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Node, useReactFlow, useStoreApi } from "reactflow";

export type NodeContextMenuInfo =
  | {
      left: number;
      top: number;
      node: Node;
    }
  | undefined;

const NodeContextMenu = ({
  nodeContextMenuInfo,
  setNodeContextMenuInfo,
}: {
  nodeContextMenuInfo: NodeContextMenuInfo;
  setNodeContextMenuInfo: (arg: NodeContextMenuInfo) => void;
}) => {
  const { setNodes, setEdges, getNodes } = useReactFlow();
  const store = useStoreApi();
  const { addSelectedNodes } = store.getState();

  const deleteNode = (nodeId: string) => {
    setNodes((n) => n.filter((node) => node.id !== nodeId));
    setEdges((e) =>
      e.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const duplicateNode = (node: Node) => {
    const nodes = getNodes();
    const id = `provider-${nodes.length + 1}`;
    setNodes((n) => [
      ...n,
      {
        ...node,
        id,
        position: {
          x: node.position.x + 10,
          y: node.position.y + 10,
        },
      },
    ]);
    addSelectedNodes([id]);
  };

  return (
    <DropdownMenu
      open={nodeContextMenuInfo !== undefined}
      onOpenChange={(open) => {
        if (!open) setNodeContextMenuInfo(undefined);
      }}
    >
      <DropdownMenuTrigger className="fixed" style={nodeContextMenuInfo} />
      <DropdownMenuContent className="z-[200] w-64" align="start" side="top">
        <DropdownMenuItem
          onClick={() => deleteNode(nodeContextMenuInfo!.node.id)}
        >
          Delete Node
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => duplicateNode(nodeContextMenuInfo!.node)}
        >
          Duplicate Node
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeContextMenu;
