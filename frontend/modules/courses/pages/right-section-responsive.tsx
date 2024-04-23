import React, { ReactNode } from "react";
import { useMediaQuery, useScreen } from "usehooks-ts";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeftIcon } from "lucide-react";
import { useResizable } from "react-resizable-layout";
import { cn } from "@/utils/common";

const RightSectionResponsive = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    defaultValue: true,
    initializeWithValue: false,
  });
  const screen = useScreen({ initializeWithValue: false });
  const {
    position: rightSectionWidth,
    separatorProps: rightSectionProps,
    isDragging: isDraggingRight,
  } = useResizable({
    axis: "x",
    initial: 300,
    min: 20,
    max: screen ? screen.width / 2 : undefined,
    reverse: true,
  });

  if (isDesktop) {
    return (
      <div className="flex grow">
        <div
          {...rightSectionProps}
          className="cursor-col-resize select-none p-[2px]"
        >
          <div
            className={cn(
              "mx-2 h-full w-[2px] bg-slate-300 cursor-col-resize dark:bg-slate-800 transition-colors",
              isDraggingRight && "bg-slate-400 dark:bg-slate-700"
            )}
          />
        </div>

        <div
          className={cn(
            "size-full shrink-0",
            isDraggingRight && "select-none cursor-col-resize"
          )}
          style={{ width: rightSectionWidth }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="absolute right-0 top-0 h-full w-2 bg-blue-400 dark:bg-blue-800" />
        <div className="absolute right-0 top-[50%] flex h-10 items-center rounded-l-xl bg-blue-400 dark:bg-blue-800">
          <ChevronLeftIcon className="size-8 text-light-700" />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="min-w-[90%]">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default RightSectionResponsive;
