import React from "react";
import { Handle, HandleProps } from "reactflow";

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
          marginTop: -5,
          marginLeft: -5,
          zIndex: 10,
        }}
      />
    </>
  );
};

export default CustomHandleDisplay;
