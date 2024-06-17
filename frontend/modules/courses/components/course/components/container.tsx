import { cn } from "@/utils/common";
import React, { ReactNode } from "react";

const Container = ({
  vertical = false,
  children,
  id,
}: {
  vertical: boolean;
  children: ReactNode;
  id?: string;
}) => {
  return (
    <div className={cn("flex", vertical && "flex-col")} id={id}>
      {children}
    </div>
  );
};

export default Container;
