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
import { Edge, EdgeMarkerType, MarkerType, useReactFlow } from "reactflow";

export type EdgeContextMenuInfo =
  | {
      left: number;
      top: number;
      edge: Edge;
    }
  | undefined;

const stringToEdgeMarkerType = (type: string): EdgeMarkerType | undefined => {
  if (type === "none") return undefined;
  if (type === "arrow")
    return {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
    };
  if (type === "closed-arrow")
    return { type: MarkerType.ArrowClosed, width: 20, height: 20 };

  return undefined;
};

const edgeMarkerTypeToString = (type: EdgeMarkerType | undefined): string => {
  if (type === undefined) return "none";
  if (typeof type === "string") return type;

  if (type.type === MarkerType.Arrow) return "arrow";
  if (type.type === MarkerType.ArrowClosed) return "closed-arrow";

  return "none";
};

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

  const setEdgeMarkerStart = (
    edgeToChange: Edge,
    markerStart: EdgeMarkerType | undefined
  ) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === edgeToChange.id) {
          return {
            ...edge,
            markerStart,
          };
        }

        return edge;
      })
    );
  };

  const setEdgeMarkerEnd = (
    edgeToChange: Edge,
    markerEnd: EdgeMarkerType | undefined
  ) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === edgeToChange.id) {
          return {
            ...edge,
            markerEnd,
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Marker Start</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuRadioGroup
              value={edgeMarkerTypeToString(
                edgeContextMenuInfo?.edge.markerStart
              )}
              onValueChange={(value) =>
                setEdgeMarkerStart(
                  edgeContextMenuInfo!.edge,
                  stringToEdgeMarkerType(value)
                )
              }
            >
              <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="arrow">Arrow</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="closed-arrow">
                Closed Arrow
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Marker End</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuRadioGroup
              value={edgeMarkerTypeToString(
                edgeContextMenuInfo?.edge.markerEnd
              )}
              onValueChange={(value) =>
                setEdgeMarkerEnd(
                  edgeContextMenuInfo!.edge,
                  stringToEdgeMarkerType(value)
                )
              }
            >
              <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="arrow">Arrow</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="closed-arrow">
                Closed Arrow
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EdgeContextMenu;
