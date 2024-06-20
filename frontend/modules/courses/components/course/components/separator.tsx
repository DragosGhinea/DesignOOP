import { cn } from "@/utils/common";
import React from "react";

const Separator = ({
  id,
  invisible = true,
}: {
  id: string;
  invisible: boolean;
}) => {
  return (
    <div
      id={id}
      className={cn("my-5 h-[2px]", !invisible && "bg-muted-foreground")}
    />
  );
};

export default Separator;
