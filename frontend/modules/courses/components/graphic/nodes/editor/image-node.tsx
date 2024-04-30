import React from "react";
import { HandleProps, NodeProps, NodeResizer, useReactFlow } from "reactflow";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomHandle from "../../handles/CustomHandle";
import ImageNodeEditor from "./image-node-editor";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export type ImageNodeData = {
  src?: string;
  keepAspectRatio?: boolean;
};

const ImageNode = (props: NodeProps) => {
  const resizable = props.data.resizable ?? false;
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];
  const imgData = props.data.imgData as ImageNodeData;
  const { setNodes } = useReactFlow();

  const updateImgData = (data: ImageNodeData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              imgData: data,
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
          minWidth={40}
          minHeight={40}
          keepAspectRatio={imgData?.keepAspectRatio ?? false}
          handleClassName="p-1 z-20"
        />
        <Avatar className="size-full rounded-none">
          <AvatarImage
            src={imgData?.src || ""}
            alt="Image"
            className="rounded-sm"
          />
          <AvatarFallback className="size-full">
            <Card className="flex size-full flex-col items-center justify-center">
              <ImageIcon className="aspect-square min-h-20 w-[95%] min-w-20" />
              <span className="font-bold">Image not found.</span>
            </Card>
          </AvatarFallback>
        </Avatar>
        <ImageNodeEditor imgData={imgData} saveInfo={updateImgData} />
      </div>
    </>
  );
};

export default ImageNode;
