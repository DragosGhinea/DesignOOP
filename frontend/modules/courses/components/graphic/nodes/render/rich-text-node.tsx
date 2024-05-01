import React from "react";

import { HandleProps, NodeProps } from "reactflow";
import { Card } from "@/components/ui/card";
import RichTextDisplay from "../../../rich-text-editor/rich-text-display";
import CustomHandleDisplay from "../../handles/custom-handle-display";

const RichTextNode = (props: NodeProps) => {
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];

  return (
    <>
      {customHandles.map((handle) => (
        <CustomHandleDisplay key={handle.id} nodeId={props.id} {...handle} />
      ))}

      <Card className="relative size-full overflow-hidden p-4 dark:border-light-800">
        <RichTextDisplay content={props.data?.content} />
      </Card>
    </>
  );
};

export default RichTextNode;
