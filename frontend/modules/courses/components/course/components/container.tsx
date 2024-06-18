import { cn } from "@/utils/common";
import React, { ReactNode } from "react";

const Container = ({
  title,
  vertical = false,
  children,
  id,
}: {
  title?: string;
  vertical: boolean;
  children: ReactNode;
  id?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <h2 className="h3-typography text-center font-bold">{title}</h2>
      )}
      <div className={cn("flex", vertical && "flex-col")} id={id}>
        {children}
      </div>
    </div>
  );
};

export default Container;
