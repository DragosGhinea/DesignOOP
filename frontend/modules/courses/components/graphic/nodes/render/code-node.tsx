import React from "react";
import { HandleProps, NodeProps } from "reactflow";
import CodeBox, { CodeBoxJson } from "../../../code-box/code-box";
import CustomHandleDisplay from "../../handles/custom-handle-display";

const CodeNode = (props: NodeProps) => {
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];
  const code = props.data?.code as CodeBoxJson;

  return (
    <>
      {customHandles.map((handle) => (
        <CustomHandleDisplay key={handle.id} nodeId={props.id} {...handle} />
      ))}

      <div className="size-full">
        <CodeBox
          code={code}
          className="h-full overflow-hidden dark:border-2 dark:border-slate-500"
          codeWrapperClassName="nodrag nowheel cursor-default"
        />
      </div>
    </>
  );
};

export default CodeNode;
