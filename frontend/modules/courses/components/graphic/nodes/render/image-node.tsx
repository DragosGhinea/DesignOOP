import React from "react";
import { HandleProps, NodeProps } from "reactflow";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CustomHandleDisplay from "../../handles/custom-handle-display";

export type ImageNodeData = {
  src?: string;
  keepAspectRatio?: boolean;
};

const ImageNode = (props: NodeProps) => {
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];
  const imgData = props.data.imgData as ImageNodeData;

  return (
    <>
      {customHandles.map((handle) => (
        <CustomHandleDisplay key={handle.id} nodeId={props.id} {...handle} />
      ))}

      <div className="size-full">
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
      </div>
    </>
  );
};

export default ImageNode;
