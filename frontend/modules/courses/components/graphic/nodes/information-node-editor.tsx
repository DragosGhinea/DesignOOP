import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditIcon, VerifiedIcon } from "lucide-react";
import React, { useRef } from "react";
import { InformationNodeConfig } from "./information-node";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const InformationNodeEditor = ({
  infoCfg,
  saveInfo,
}: {
  infoCfg: InformationNodeConfig;
  saveInfo: (info: InformationNodeConfig) => void;
}) => {
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fontSizeInputRef = useRef<HTMLInputElement>(null);
  const [side, setSide] = React.useState<string>(infoCfg.side);

  const collectInfoCfg = (): InformationNodeConfig => {
    return {
      content: contentTextareaRef.current?.value ?? infoCfg.content,
      fontSize: parseInt(fontSizeInputRef.current?.value ?? "12"),
      side,
    } as InformationNodeConfig;
  };

  return (
    <Dialog>
      <DialogTrigger className="fixed right-0 top-0 -m-3 cursor-pointer">
        <EditIcon className="size-4" />
      </DialogTrigger>
      <DialogContent className="z-[200] overflow-y-auto lg:max-w-[90%]">
        <ScrollArea className="max-h-[80vh] px-5">
          <div className="flex flex-col gap-8">
            <h3 className="h3-typography font-bold">Information Node Editor</h3>

            <div className="flex flex-col gap-2 pl-2">
              <label className="h6-typography font-bold">Content</label>
              <textarea
                ref={contentTextareaRef}
                className="h-32 w-full bg-slate-100 p-2 dark:bg-slate-900"
                defaultValue={infoCfg.content}
              />
            </div>

            <div className="flex flex-col gap-2 pl-2">
              <label className="h6-typography font-bold">
                Font Size (Pixels)
              </label>
              <Input
                ref={fontSizeInputRef}
                placeholder="px value"
                className="w-32"
                type="number"
                defaultValue={infoCfg.fontSize}
              />
            </div>

            <div className="flex flex-col gap-2 pl-2">
              <label className="h6-typography font-bold">Tooltip Side</label>
              <RadioGroup defaultValue={infoCfg.side} onValueChange={setSide}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="top" id="r1" />
                  <Label htmlFor="r1">Top</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bottom" id="r2" />
                  <Label htmlFor="r2">Bottom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="left" id="r3" />
                  <Label htmlFor="r3">Left</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="right" id="r4" />
                  <Label htmlFor="r4">Right</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-sm bg-slate-200 px-3 py-4 dark:bg-slate-900">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    const cfg = collectInfoCfg();
                    saveInfo(cfg);
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

export default InformationNodeEditor;
