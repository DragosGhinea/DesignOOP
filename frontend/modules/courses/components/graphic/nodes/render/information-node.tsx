/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { HandleProps, NodeProps } from "reactflow";
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomHandleDisplay from "../../handles/custom-handle-display";

export type InformationNodeConfig = {
  content: string;
  fontSize: number;
  side: "top" | "right" | "bottom" | "left";
};

const InformationNode = (props: NodeProps) => {
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];
  const infoCfg = props.data.infoCfg as InformationNodeConfig;

  return (
    <>
      {customHandles.map((handle) => (
        <CustomHandleDisplay key={handle.id} nodeId={props.id} {...handle} />
      ))}

      <Card className="relative flex size-full items-center justify-center overflow-hidden dark:border-light-800">
        <Tooltip>
          <TooltipTrigger className="flex size-full items-center justify-center p-1">
            <InfoIcon className="min-h-[max(32px,80%)] min-w-[max(32px,80%)]" />
          </TooltipTrigger>
          <TooltipContent side={infoCfg.side}>
            <div className="flex max-h-32 max-w-64 overflow-hidden py-2">
              <ScrollArea className="nodrag nowheel max-h-full cursor-default px-3">
                <p
                  className="max-h-full text-justify"
                  style={{ fontSize: infoCfg.fontSize }}
                >
                  {infoCfg.content}
                </p>
              </ScrollArea>
            </div>
          </TooltipContent>
        </Tooltip>
      </Card>
    </>
  );
};

export default InformationNode;
