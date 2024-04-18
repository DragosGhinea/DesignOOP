"use client";

import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

const ConditionalRenderMediaQuery = ({
  mediaQuery,
  trueComponent,
  falseComponent,
  initializeWithValue = true,
  defaultValue = false,
}: {
  mediaQuery: string;
  trueComponent: ReactNode;
  falseComponent: ReactNode;
  initializeWithValue?: boolean;
  defaultValue?: boolean;
}) => {
  const mediaQueryCondition = useMediaQuery(mediaQuery, {
    initializeWithValue,
    defaultValue,
  });
  return mediaQueryCondition ? trueComponent : falseComponent;
};

export default ConditionalRenderMediaQuery;
