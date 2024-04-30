import React from "react";
import { HandleProps, NodeProps, NodeResizer, useReactFlow } from "reactflow";
import CodeBoxWithEdit from "../../../code-box/code-box-with-edit";
import { CodeBoxJson } from "../../../code-box/code-box";
import CustomHandle from "../../handles/CustomHandle";

const CodeNode = (props: NodeProps) => {
  const { setNodes } = useReactFlow();
  const resizable = props.data.resizable ?? false;
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];
  const code = props.data?.code as CodeBoxJson;

  const updateContent = (content: CodeBoxJson) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              code: content,
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

      <div className="size-full">
        <NodeResizer
          isVisible={resizable}
          minWidth={100}
          minHeight={100}
          handleClassName="p-1"
        />
        <CodeBoxWithEdit
          code={code}
          onSave={updateContent}
          className="h-full overflow-hidden dark:border-2 dark:border-slate-500"
          codeWrapperClassName="nodrag nowheel cursor-default"
        />
      </div>
    </>
  );
};

export default CodeNode;
