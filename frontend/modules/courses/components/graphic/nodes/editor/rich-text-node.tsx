import React from "react";

import { HandleProps, NodeProps, NodeResizer, useReactFlow } from "reactflow";
import RichTextEditor from "../../../rich-text-editor/rich-text-editor";
import CustomHandle from "../../handles/CustomHandle";
import { Card } from "@/components/ui/card";
import { JSONContent } from "@tiptap/react";

const RichTextNode = (props: NodeProps) => {
  const { setNodes } = useReactFlow();
  const resizable = props.data.resizable ?? false;
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];

  const updateContent = (content: JSONContent) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              content,
            },
          };
        }
        return node;
      })
    );
  };

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

      <Card className="relative size-full overflow-hidden p-4 dark:border-light-800">
        <RichTextEditor
          changeContent={updateContent}
          content={props.data?.content}
        />
      </Card>
    </>
  );
};

export default RichTextNode;
