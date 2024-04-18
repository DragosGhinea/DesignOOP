"use client";

import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

const ConditionalRenderMediaQuery = ({
  mediaQuery,
  trueComponent,
  falseComponent,
}: {
  mediaQuery: string;
  trueComponent: ReactNode;
  falseComponent: ReactNode;
}) => {
  const mediaQueryCondition = useMediaQuery(mediaQuery, {
    initializeWithValue: false,
  });
  return mediaQueryCondition ? trueComponent : falseComponent;
};

export default ConditionalRenderMediaQuery;
