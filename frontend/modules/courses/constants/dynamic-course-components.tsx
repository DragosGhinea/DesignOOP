import React from "react";
import Container from "../components/course/container";
import Paragraph from "../components/course/paragraph";

type BaseParam = {
  paramName: string;
  paramAutocomplete?: any;
  description?: string;
};

type ParamWithType = BaseParam & {
  paramType: string;
};

type ParamWithLiteralValues = BaseParam & {
  literalValues: string[];
};

export type ComponentConfig = {
  component: React.FC<any>;
  params: (ParamWithType | ParamWithLiteralValues)[];
  hasChildren: boolean;
};

export const Components: { [key: string]: ComponentConfig } = {
  container: {
    component: Container,
    params: [],
    hasChildren: true,
  },
  paragraph: {
    component: Paragraph,
    params: [
      { paramName: "title", paramType: "string" },
      { paramName: "text", paramType: "string" },
    ],
    hasChildren: false,
  },
};
