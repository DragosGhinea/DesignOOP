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

const generateData = (type: string) => {
  switch (type) {
    case "code":
      return {
        code: "console.log('Hello, world!')",
      };
    case "information":
      return {
        infoCfg: {
          content:
            "This is an example information node. You can resize it and the icon will get bigger. The editing button that appears in the corner is visible only in this editor. You can change the content and the font size. When the information gets too long, the content will become scrollable. The maximum height of this box is 128px, and the maximum width is 256px.",
          fontSize: 12,
          side: "top",
        },
      };
    case "rich-text":
      return {
        resizable: true,
      };
    case "image":
      return {
        resizable: true,
      };
    default:
      return {};
  }
};

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
    const toAdd = {
      id,
      type,
      data: generateData(type),
      position,
    };

    setNodes((n) => [...n, toAdd]);
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
            <DropdownMenuItem
              onClick={() =>
                addNode(paneContextMenuInfo!.flowPosition, "information")
              }
            >
              Information Node
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                addNode(paneContextMenuInfo!.flowPosition, "rich-text")
              }
            >
              Rich Text Node
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                addNode(paneContextMenuInfo!.flowPosition, "image")
              }
            >
              Image Node
            </DropdownMenuItem>
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
