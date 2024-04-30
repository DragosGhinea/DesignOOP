import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convertBase64ToString } from "@/utils/base64";
import JSONCrush from "jsoncrush";
import React, { ReactNode, useRef } from "react";
import { toast } from "sonner";

const GraphicLoadModal = ({
  trigger,
  setGraphic,
}: {
  trigger: ReactNode;
  setGraphic: (graphic: JSON) => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleLoad = () => {
    try {
      if (!inputRef.current) return;
      const crushedString = convertBase64ToString(inputRef.current.value);
      console.log("CRUSHED RESTORED", crushedString);
      const input = JSONCrush.uncrush(crushedString);
      console.log("UNCRUSHED", input);
      const graphic = JSON.parse(input);
      console.log(graphic);
      setGraphic(graphic);
    } catch (e) {
      console.error(e);
      toast.error(
        "There was an error loading the graphic. Please check the format."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-bold">Load graphic</h2>
          <textarea
            ref={inputRef}
            className="max-h-[50vh] min-h-[30vh] w-full rounded-none bg-slate-200 dark:bg-slate-700"
          />
          <DialogClose asChild>
            <Button variant="success" onClick={handleLoad}>
              Load
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GraphicLoadModal;
