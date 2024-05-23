import React from "react";
import Container from "../components/course/components/container";
import Paragraph from "../components/course/components/paragraph";
import Graphic from "../components/course/components/graphic";

type LintParams = {
  required?: boolean;
  type?: string;
};

type BaseParam = {
  paramName: string;
  linting?: LintParams;
  paramAutocomplete?: any;
  description?: string;
};

export type ParamWithType = BaseParam & {
  paramType: string;
};

export type ParamWithLiteralValues = BaseParam & {
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
  graphic: {
    component: Graphic,
    params: [{ paramName: "graphic", paramType: "string" }],
    hasChildren: false,
  },
};

export const CourseParameters: ParamWithType[] = [
  {
    paramName: "title",
    paramType: "string",
    linting: { required: true, type: "String" },
  },
  { paramName: "subtitle", paramType: "string" },
  { paramName: "description", paramType: "string" },
  { paramName: "tags", paramType: "string[]", paramAutocomplete: "[]" },
  {
    paramName: "components",
    paramType: "Component[]",
    paramAutocomplete: "[]",
  },
];
