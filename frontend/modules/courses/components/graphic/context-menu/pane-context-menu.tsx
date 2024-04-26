import React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReactFlow, XYPosition } from "reactflow";
import { GraphicStateEditorExtraConfig } from "../graphic-state-editor";

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
  extraConfig,
  setExtraConfig,
}: {
  paneContextMenuInfo: PaneContextMenuInfo;
  setPaneContextMenuInfo: (arg: PaneContextMenuInfo) => void;
  extraConfig: GraphicStateEditorExtraConfig;
  setExtraConfig: any;
}) => {
  const { getNodes, setNodes } = useReactFlow();

  const addNode = (position: XYPosition, type: string) => {
    const nodes = getNodes();
    const id = `provider-${nodes.length + 1}`;
    setNodes((n) => [
      ...n,
      {
        id,
        type,
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
              onClick={() => addNode(paneContextMenuInfo!.flowPosition, "code")}
            >
              Code Node
            </DropdownMenuItem>
            <DropdownMenuItem>Information Node</DropdownMenuItem>
            <DropdownMenuItem>Comment Node</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={extraConfig.snapToGrid}
          onCheckedChange={(checked) =>
            setExtraConfig((prev: GraphicStateEditorExtraConfig) => ({
              ...prev,
              snapToGrid: checked,
            }))
          }
        >
          Snap To Grid
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaneContextMenu;
