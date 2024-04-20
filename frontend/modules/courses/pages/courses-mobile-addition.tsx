import React, { ReactNode } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const CoursesMobileAddition = ({
  leftSide,
  middleSection,
  rightSide,
}: {
  leftSide: ReactNode;
  middleSection: ReactNode;
  rightSide: ReactNode;
}) => {
  return (
    <>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="absolute top-0 h-full w-2 bg-blue-400 dark:bg-blue-800" />
            <div className="absolute top-[50%] flex h-10 items-center rounded-r-xl bg-blue-400 dark:bg-blue-800">
              <ChevronRightIcon className="size-8 text-light-700" />
            </div>
          </SheetTrigger>
          <SheetContent side="left">{leftSide}</SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger>
            <div className="absolute right-0 top-0 h-full w-2 bg-blue-400 dark:bg-blue-800" />
            <div className="absolute right-0 top-[50%] flex h-10 items-center rounded-l-xl bg-blue-400 dark:bg-blue-800">
              <ChevronLeftIcon className="size-8 text-light-700" />
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="min-w-[90%]">
            {rightSide}
          </SheetContent>
        </Sheet>
      </div>

      <div className="overflow-hidden px-10 lg:hidden">{middleSection}</div>
    </>
  );
};

export default CoursesMobileAddition;
