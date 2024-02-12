import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { EyeIcon, SearchIcon, StarsIcon } from "lucide-react";
import React, { ReactNode } from "react";

const LeftSidebarItem = ({ name, icon }: { name: string; icon: ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="inline-flex min-h-16 min-w-16 items-center gap-0 rounded-lg border-4 border-dark-300 @[16rem]:gap-4"
          >
            {icon}
            <span className="base-semibold max-w-0 overflow-hidden text-nowrap transition-[max-width] duration-300 @[16rem]:max-w-[100%]">
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
          <p className="base-semibold">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LeftSidebar = () => {
  return (
    <div className="flex size-full flex-col items-center @container">
      <div className="base-semibold flex h-full flex-col justify-between gap-5 py-10">
        <LeftSidebarItem name="Search Course" icon={<SearchIcon />} />
        <LeftSidebarItem name="Recently Visited" icon={<EyeIcon />} />
        <LeftSidebarItem name="Recommended" icon={<StarsIcon />} />
      </div>
    </div>
  );
};

export default LeftSidebar;
