import React from "react";
import {
  Handle,
  HandleProps,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "reactflow";
import { toast } from "sonner";

export type CustomHandleProps = HandleProps & {
  nodeId: string;
  height: string;
  width: string;
};

const CustomHandle = ({ nodeId, ...props }: CustomHandleProps) => {
  const { setNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const deleteHandle = (handleId: string) => {
    setNodes((n) =>
      n.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                customHandles: node.data.customHandles?.filter(
                  (handle: CustomHandleProps) => handle.id !== handleId
                ),
              },
            }
          : node
      )
    );
    updateNodeInternals(nodeId);
  };

  return (
    <>
      <Handle
        {...props}
        isConnectable={true}
        style={{
          width: 10,
          height: 10,
          backgroundColor: props.type === "source" ? "red" : "blue",
          top: props.height,
          left: props.width,
          marginTop:
            props.position === Position.Top ||
            props.position === Position.Bottom
              ? -5
              : 0,
          marginLeft:
            props.position === Position.Left ||
            props.position === Position.Right
              ? -5
              : 0,
          zIndex: 10,
        }}
        onDoubleClick={() => {
          toast("Do you want to delete this handle?", {
            action: {
              label: "Delete",
              onClick: () => deleteHandle(props.id ?? ""),
            },
          });
        }}
      />
    </>
  );
};

export default CustomHandle;
