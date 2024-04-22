"use client"

import React, { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

const MiddleSectionResponsive = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return (
    <div className="size-full">
        {children}
    </div>
    );
  }

  return <div className="size-full overflow-hidden px-10">{children}</div>;
};

export default MiddleSectionResponsive;
