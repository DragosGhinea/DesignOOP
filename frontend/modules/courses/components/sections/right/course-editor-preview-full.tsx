import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { MaximizeIcon } from "lucide-react";
import React, { ReactNode } from "react";

const CourseEditorPreviewFull = ({ content }: { content: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger className="absolute right-2 top-2 z-20" asChild>
        <Button className="p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <MaximizeIcon />
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={10}>
              Maximize
            </TooltipContent>
          </Tooltip>
        </Button>
      </DialogTrigger>
      <DialogContent className="m-2 flex h-[95%] max-h-[95%] min-w-[95%]">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditorPreviewFull;
