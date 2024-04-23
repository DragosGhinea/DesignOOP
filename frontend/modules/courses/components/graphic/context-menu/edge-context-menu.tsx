import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Edge, useReactFlow } from "reactflow";

export type EdgeContextMenuInfo =
  | {
      left: number;
      top: number;
      edge: Edge;
    }
  | undefined;

const EdgeContextMenu = ({
  edgeContextMenuInfo,
  setEdgeContextMenuInfo,
}: {
  edgeContextMenuInfo: EdgeContextMenuInfo;
  setEdgeContextMenuInfo: (arg: EdgeContextMenuInfo) => void;
}) => {
  const { setEdges } = useReactFlow();

  const deleteEdge = (edgeId: string) => {
    setEdges((e) => e.filter((edge) => edge.id !== edgeId));
  };

  const setEdgeType = (edgeToChange: Edge, type: string) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === edgeToChange.id) {
          return {
            ...edge,
            type,
          };
        }

        return edge;
      })
    );
  };

  const setEdgeTexture = (edgeToChange: Edge, texture: string) => {
    const animated = texture === "animated";

    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === edgeToChange.id) {
          return {
            ...edge,
            animated,
          };
        }

        return edge;
      })
    );
  };

  return (
    <DropdownMenu
      open={edgeContextMenuInfo !== undefined}
      onOpenChange={(open) => {
        if (!open) setEdgeContextMenuInfo(undefined);
      }}
    >
      <DropdownMenuTrigger className="fixed" style={edgeContextMenuInfo} />
      <DropdownMenuContent className="z-[200] w-64" align="start" side="top">
        <DropdownMenuItem
          onClick={() => deleteEdge(edgeContextMenuInfo!.edge.id)}
        >
          Delete Edge
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edge Style</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuLabel className="font-bold">
              Shape Style
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={edgeContextMenuInfo?.edge.type || "bezier"}
              onValueChange={(value) =>
                setEdgeType(edgeContextMenuInfo!.edge, value)
              }
            >
              <DropdownMenuRadioItem value="bezier">
                Bezier
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="straight">
                Straight
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="step">Step</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="smoothstep">
                Smoothstep
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-bold">
              Dynamic Style
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={
                edgeContextMenuInfo?.edge.animated ? "animated" : "default"
              }
              onValueChange={(value) =>
                setEdgeTexture(edgeContextMenuInfo!.edge, value)
              }
            >
              <DropdownMenuRadioItem value="animated">
                Animated Dash
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="default">
                Default
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EdgeContextMenu;
