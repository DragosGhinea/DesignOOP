import React from "react";
import Container from "../components/course/components/container";
import Paragraph from "../components/course/components/paragraph";
import Graphic from "../components/course/components/graphic";
import Notification from "../components/course/components/notification";
import MultiParagraph from "../components/course/components/multi-paragraph";
import Carousel from "../components/course/components/carousel";

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
    params: [
      {
        paramName: "vertical",
        paramType: "boolean",
        paramAutocomplete: "true",
      },
      {
        paramName: "title",
        paramType: "string",
      },
    ],
    hasChildren: true,
  },
  carousel: {
    component: Carousel,
    params: [],
    hasChildren: true,
  },
  paragraph: {
    component: Paragraph,
    params: [
      {
        paramName: "title",
        paramType: "string",
        paramAutocomplete: '"New Paragraph Title"',
      },
      {
        paramName: "text",
        paramType: "string",
        paramAutocomplete: '"New Paragraph Content"',
      },
    ],
    hasChildren: false,
  },
  "multi-paragraph": {
    component: MultiParagraph,
    params: [
      {
        paramName: "title",
        paramType: "string",
        paramAutocomplete: '"New Multi-Paragraph Title"',
      },
      {
        paramName: "text",
        paramType: "string[]",
        paramAutocomplete:
          '[\n\t\t"New Multi-Paragraph Content",\n\t\t"New Multi-Paragraph Content2"\n\t]',
      },
    ],
    hasChildren: false,
  },
  notification: {
    component: Notification,
    params: [
      {
        paramName: "type",
        literalValues: ['"info"', '"warning"', '"error"'],
      },
      {
        paramName: "content",
        paramType: "string",
        linting: { required: true, type: "String" },
      },
      {
        paramName: "closable",
        paramType: "boolean",
        paramAutocomplete: "true",
      },
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
