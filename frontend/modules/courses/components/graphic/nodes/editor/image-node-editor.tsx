import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditIcon, VerifiedIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { ImageNodeData } from "./image-node";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ImageNodeEditor = ({
  imgData,
  saveInfo,
}: {
  imgData: ImageNodeData;
  saveInfo: (data: ImageNodeData) => void;
}) => {
  const srcInputRef = useRef<HTMLInputElement>(null);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(
    imgData?.keepAspectRatio ?? false
  );

  const collectImgData = (): ImageNodeData => {
    return {
      src: srcInputRef.current?.value ?? imgData.src,
      keepAspectRatio,
    } as ImageNodeData;
  };

  return (
    <Dialog>
      <DialogTrigger className="fixed right-0 top-0 -m-3 cursor-pointer">
        <EditIcon className="size-4" />
      </DialogTrigger>
      <DialogContent className="z-[200] overflow-y-auto lg:max-w-[90%]">
        <ScrollArea className="max-h-[80vh] px-5">
          <div className="flex flex-col gap-8">
            <h3 className="h3-typography font-bold">Image Node Editor</h3>

            <div className="flex flex-col gap-2 pl-2">
              <label className="h6-typography font-bold">Image Src</label>
              <Input
                ref={srcInputRef}
                className="w-[95%]"
                defaultValue={imgData?.src || ""}
              />
            </div>

            <div className="flex items-center gap-2 pl-2">
              <Checkbox
                defaultChecked={keepAspectRatio}
                onCheckedChange={() => setKeepAspectRatio((prev) => !prev)}
              />
              <label className="h6-typography leading-none">
                Keep Aspect Ratio on Resize
              </label>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-sm bg-slate-200 px-3 py-4 dark:bg-slate-900">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    const imgData = collectImgData();
                    saveInfo(imgData);
                  }}
                  className="flex items-center gap-2"
                  variant="success"
                >
                  <VerifiedIcon />
                  Save
                </Button>
              </DialogClose>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ImageNodeEditor;
