import React from "react";

import { NodeProps, NodeResizer } from "reactflow";
import RichTextEditor from "../../rich-text-editor/rich-text-editor";

const RichTextNode = (props: NodeProps) => {
  const resizable = props.data.resizable ?? false;

  return (
    <div>
      <NodeResizer
        isVisible={resizable}
        minWidth={100}
        minHeight={100}
        handleClassName="p-1"
      />

      <RichTextEditor />
    </div>
  );
};

export default RichTextNode;
