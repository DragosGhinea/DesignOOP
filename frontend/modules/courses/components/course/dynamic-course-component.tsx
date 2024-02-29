"use client";

import React, { useMemo } from "react";
import Paragraph from "./paragraph";
import Container from "./container";
import { ErrorBoundary } from "react-error-boundary";

const Components: { [key: string]: React.FC<any> } = {
  container: Container,
  paragraph: Paragraph,
};

const DynamicCourseComponent = ({
  jsonData,
}: {
  jsonData: { componentType: string; children?: any };
}) => {
  const { children: jsonDataChildren, ...jsonDataWithoutChildren } = jsonData;

  const renderedChildren = useMemo(() => {
    if (!jsonDataChildren || jsonDataChildren.length === 0) {
      return null;
    }
    return jsonDataChildren.map((child: any, index: number) => (
      <ErrorBoundary
        key={JSON.stringify({ ...child, children: undefined, index })}
        fallback={<h1>There is an error.</h1>}
      >
        <DynamicCourseComponent jsonData={child} />
      </ErrorBoundary>
    ));
  }, [jsonDataChildren]);

  const Component = Components[jsonData.componentType];
  if (!Component) {
    throw new Error(`Component "${jsonData.componentType}" not found.`);
  }

  return <Component {...jsonDataWithoutChildren}>{renderedChildren}</Component>;
};

export default DynamicCourseComponent;
