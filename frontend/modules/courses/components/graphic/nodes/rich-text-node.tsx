import React from "react";

import { HandleProps, NodeProps, NodeResizer } from "reactflow";
import RichTextEditor from "../../rich-text-editor/rich-text-editor";
import CustomHandle from "../handles/CustomHandle";
import { Card } from "@/components/ui/card";

const RichTextNode = (props: NodeProps) => {
  const resizable = props.data.resizable ?? false;
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];

  return (
    <>
      {customHandles.map((handle) => (
        <CustomHandle key={handle.id} nodeId={props.id} {...handle} />
      ))}

      <NodeResizer
        isVisible={resizable}
        minWidth={20}
        minHeight={20}
        handleClassName="p-1 z-20"
      />

      <Card className="relative size-full overflow-hidden p-4">
        <RichTextEditor />
      </Card>
    </>
  );
};

export default RichTextNode;
