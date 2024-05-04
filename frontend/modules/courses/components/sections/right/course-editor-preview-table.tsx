import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { AlignJustifyIcon } from "lucide-react";
import React, { ReactNode } from "react";

const CourseEditorPreviewTable = ({ content }: { content: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger className="absolute left-2 top-2 z-20" asChild>
        <Button className="p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <AlignJustifyIcon />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              Preview table of contents
            </TooltipContent>
          </Tooltip>
        </Button>
      </DialogTrigger>
      <DialogContent className="m-2 flex h-[95%] max-h-[95%]">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditorPreviewTable;
