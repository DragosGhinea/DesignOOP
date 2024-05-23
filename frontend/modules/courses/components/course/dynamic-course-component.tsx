"use client";

import React, { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Components } from "../../constants/dynamic-course-components";

const DynamicCourseComponent = ({
  jsonData,
}: {
  jsonData: {
    componentType: string;
    children?: any;
    contentTable?: { id: string };
  };
}) => {
  const { children: jsonDataChildren, contentTable, ...otherJsonProperties } = jsonData;

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

  const Component = Components[jsonData.componentType].component;
  if (!Component) {
    throw new Error(`Component "${jsonData.componentType}" not found.`);
  }

  return (
    <Component
      id={contentTable?.id}
      {...otherJsonProperties}
    >
      {renderedChildren}
    </Component>
  );
};

export default DynamicCourseComponent;
