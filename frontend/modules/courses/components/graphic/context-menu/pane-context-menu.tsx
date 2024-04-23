import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReactFlow, XYPosition } from "reactflow";

export type PaneContextMenuInfo =
  | {
      left: number;
      top: number;
      flowPosition: XYPosition;
    }
  | undefined;

const PaneContextMenu = ({
  paneContextMenuInfo,
  setPaneContextMenuInfo,
}: {
  paneContextMenuInfo: PaneContextMenuInfo;
  setPaneContextMenuInfo: (arg: PaneContextMenuInfo) => void;
}) => {
  const { getNodes, setNodes } = useReactFlow();

  const addNode = (position: XYPosition) => {
    const nodes = getNodes();
    const id = `provider-${nodes.length + 1}`;
    setNodes((n) => [
      ...n,
      {
        id,
        data: { label: `Node ${nodes.length + 1}` },
        position,
      },
    ]);
  };

  return (
    <DropdownMenu
      open={paneContextMenuInfo !== undefined}
      onOpenChange={(open) => {
        if (!open) setPaneContextMenuInfo(undefined);
      }}
    >
      <DropdownMenuTrigger className="fixed" style={paneContextMenuInfo} />
      <DropdownMenuContent className="z-[200] w-64" align="start" side="top">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger inset>Create</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem
              onClick={() => addNode(paneContextMenuInfo!.flowPosition)}
            >
              Code Node
            </DropdownMenuItem>
            <DropdownMenuItem>Information Node</DropdownMenuItem>
            <DropdownMenuItem>Comment Node</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaneContextMenu;
