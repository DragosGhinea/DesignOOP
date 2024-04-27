import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Node,
  Position,
  useReactFlow,
  useStoreApi,
  useUpdateNodeInternals,
  XYPosition,
} from "reactflow";
import { toast } from "sonner";

export type NodeContextMenuInfo =
  | {
      left: number;
      top: number;
      flowPosition: XYPosition;
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
  const updateNodeInternals = useUpdateNodeInternals();

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

  const addHandleToNode = (
    nodeId: string,
    width: string,
    height: string,
    type: "source" | "target"
  ) => {
    let position;
    if (width === "0%") position = Position.Left;
    else if (width === "100%") position = Position.Right;
    else if (height === "0%") position = Position.Top;
    // if (height === "100%")
    else position = Position.Bottom;

    setNodes((n) =>
      n.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                customHandles: [
                  ...(node.data.customHandles ?? []),
                  {
                    id: `${height}-${width}`,
                    position,
                    isConnectable: true,
                    type,
                    width,
                    height,
                  },
                ],
              },
            }
          : node
      )
    );
    updateNodeInternals(nodeId);
  };

  const addHandleToNodeJustType = (type: "source" | "target") => {
    const width = Math.abs(
      nodeContextMenuInfo!.node.position.x - nodeContextMenuInfo!.flowPosition.x
    );
    const height = Math.abs(
      nodeContextMenuInfo!.node.position.y - nodeContextMenuInfo!.flowPosition.y
    );

    const totalHeight = nodeContextMenuInfo!.node.height ?? 0;
    const totalWidth = nodeContextMenuInfo!.node.width ?? 0;

    let heightPercent = (height / totalHeight) * 100;
    let widthPercent = (width / totalWidth) * 100;

    const closeToTop = totalHeight - height < 10;
    const closeToBottom = height < 10;
    const closeToLeft = width < 10;
    const closeToRight = totalWidth - width < 10;

    if (!closeToTop && !closeToBottom && !closeToLeft && !closeToRight) {
      toast.error("Handle must be close to the edge of the node.");
      return;
    }

    if (closeToTop) heightPercent = 100;
    else if (closeToBottom) heightPercent = 0;
    if (closeToLeft) widthPercent = 0;
    else if (closeToRight) widthPercent = 100;

    addHandleToNode(
      nodeContextMenuInfo!.node.id,
      `${widthPercent}%`,
      `${heightPercent}%`,
      type
    );
  };

  return (
    <DropdownMenu
      open={nodeContextMenuInfo !== undefined}
      onOpenChange={(open) => {
        if (!open) setNodeContextMenuInfo(undefined);
      }}
    >
      <DropdownMenuTrigger className="fixed" style={nodeContextMenuInfo} />
      <DropdownMenuContent className="z-[200] w-72" align="start" side="top">
        <DropdownMenuItem
          inset
          onClick={() => deleteNode(nodeContextMenuInfo!.node.id)}
        >
          Delete Node
        </DropdownMenuItem>
        <DropdownMenuItem
          inset
          onClick={() => duplicateNode(nodeContextMenuInfo!.node)}
        >
          Duplicate Node
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={nodeContextMenuInfo?.node.data.resizable ?? false}
          onCheckedChange={(checked) => {
            setNodes((n) =>
              n.map((node) =>
                node.id === nodeContextMenuInfo!.node.id
                  ? { ...node, data: { ...node.data, resizable: checked } }
                  : node
              )
            );
          }}
        >
          Resizable
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          inset
          onClick={() => addHandleToNodeJustType("source")}
        >
          Add Source Handle
          <DropdownMenuShortcut>(Red Dev Only)</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          inset
          onClick={() => addHandleToNodeJustType("target")}
        >
          Add Target Handle
          <DropdownMenuShortcut>(Blue Dev Only)</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeContextMenu;
