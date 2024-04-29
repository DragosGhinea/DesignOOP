"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { EyeIcon, SearchIcon, StarsIcon } from "lucide-react";
import React, { ReactNode } from "react";

const LeftSidebarItem = ({ name, icon }: { name: string; icon: ReactNode }) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex min-h-16 min-w-16 max-w-16 items-center rounded-lg border-4 border-dark-300 transition-[max-width] duration-300 @[16rem]:max-w-[100%] @[16rem]:gap-4"
        >
          <div>{icon}</div>
          <span className="p-typography overflow-hidden text-nowrap font-semibold ">
            {name}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        sideOffset={5}
        className="@[16rem]:hidden"
      >
        <p className="p-typography font-semibold">{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const LeftSidebar = () => {
  return (
    <div className="flex size-full flex-col items-center @container">
      <div className="flex h-full max-w-16 flex-col justify-between gap-5 py-10 transition-[max-width] duration-300 @[16rem]:max-w-[100%]">
        <LeftSidebarItem name="Search Course" icon={<SearchIcon />} />
        <LeftSidebarItem name="Recently Visited" icon={<EyeIcon />} />
        <LeftSidebarItem name="Recommended" icon={<StarsIcon />} />
      </div>
    </div>
  );
};

export default LeftSidebar;
