import React from "react";
import { Handle, HandleProps, Position } from "reactflow";

export type CustomHandleProps = HandleProps & {
  nodeId: string;
  height: string;
  width: string;
};

const CustomHandleDisplay = ({ nodeId, ...props }: CustomHandleProps) => {
  return (
    <>
      <Handle
        {...props}
        isConnectable={false}
        style={{
          width: 10,
          height: 10,
          //   backgroundColor: props.type === "source" ? "red" : "blue",
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
      />
    </>
  );
};

export default CustomHandleDisplay;
