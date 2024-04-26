import React, { ReactNode } from "react";
import { useResizable } from "react-resizable-layout";
import { useMediaQuery } from "usehooks-ts";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/utils/common";

const LeftSectionResponsive = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    defaultValue: true,
    initializeWithValue: false,
  });
  const {
    position: leftSectionWidth,
    separatorProps: leftSectionProps,
    isDragging: isDraggingLeft,
  } = useResizable({
    axis: "x",
    initial: 300,
    min: 170,
    max: 350,
  });

  if (isDesktop) {
    return (
      <div className="flex grow">
        <div
          className={cn(
            "size-full shrink-0 z-[50]",
            isDraggingLeft && "select-none cursor-col-resize"
          )}
          style={{ width: leftSectionWidth }}
        >
          {children}
        </div>

        <div
          {...leftSectionProps}
          className="cursor-col-resize select-none p-[2px]"
        >
          <div
            className={cn(
              "mx-2 h-full w-[2px] bg-slate-300 cursor-col-resize dark:bg-slate-800 transition-colors",
              isDraggingLeft && "bg-slate-400 dark:bg-slate-700"
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="absolute top-0 h-full w-2 bg-blue-400 dark:bg-blue-800" />
        <div className="absolute top-[50%] flex h-10 items-center rounded-r-xl bg-blue-400 dark:bg-blue-800">
          <ChevronRightIcon className="size-8 text-light-700" />
        </div>
      </SheetTrigger>
      <SheetContent side="left">{children}</SheetContent>
    </Sheet>
  );
};

export default LeftSectionResponsive;
