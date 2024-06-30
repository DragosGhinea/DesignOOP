import { cn } from "@/utils/common";
import React, { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

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
  const shouldEnforceVertical = useMediaQuery("(max-width: 540px)", {
    defaultValue: false,
  });

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <h2 className="h3-typography text-center font-bold">{title}</h2>
      )}
      <div className={cn("flex", (vertical || shouldEnforceVertical) && "flex-col")} id={id}>
        {children}
      </div>
    </div>
  );
};

export default Container;
