import { SyntaxNode } from "@lezer/common";
import { Diagnostic } from "@codemirror/lint";
import { EditorView, Text } from "@uiw/react-codemirror";
import { syntaxTree } from "@codemirror/language";
import { extractProperty } from "./json-syntax-tree";
import {
  Components,
  CourseParameters,
  ParamWithLiteralValues,
  ParamWithType,
} from "../constants/dynamic-course-components";

const iterateComponentTree = (
  text: Text,
  objectNode: SyntaxNode,
  diagnostics: Diagnostic[]
) => {
  if (objectNode.name !== "Object") {
    diagnostics.push({
      from: objectNode.from,
      to: objectNode.to,
      message: "Component must be of type Object",
      severity: "error",
    });
    return;
  }

  let componentType;
  const properties = [];
  let children;
  for (const node of objectNode.getChildren("Property")) {
    const property = extractProperty(text, node);
    if (!property) continue;

    if (property.propertyKey === "componentType") {
      componentType = property.propertyValue.substring(
        1,
        property.propertyValue.length - 1
      );

      if (!Components[componentType]) {
        diagnostics.push({
          from: objectNode.from,
          to: objectNode.to,
          message: `Component type "${componentType}" does not exist`,
          severity: "error",
        });
        return;
      }
    } else if (property.propertyKey === "children") {
      children = node.lastChild;
    } else {
      properties.push({ node, property });
    }
  }

  if (!componentType) {
    diagnostics.push({
      from: objectNode.from,
      to: objectNode.to,
      message: "Component must have a componentType property",
      severity: "error",
    });
    return;
  }

  const componentParams: ((ParamWithType | ParamWithLiteralValues) & {
    visited?: boolean;
  })[] = [...Components[componentType].params];

  for (const { node, property } of properties) {
    const paramIndex = componentParams.findIndex(
      (param) => param.paramName === property.propertyKey
    );

    if (paramIndex === -1) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        message: `Property "${property.propertyKey}" does not exist in component "${componentType}"`,
        severity: "warning",
      });
    } else {
      const param = componentParams[paramIndex];
      if (param.linting) {
        if (param.linting.type !== node.lastChild!.name) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            message: `Property "${property.propertyKey}" must be of type "${param.linting.type}", not "${node.lastChild!.name}"`,
            severity: "error",
          });
        }
      }

      componentParams[paramIndex].visited = true;
    }
  }

  for (const param of componentParams) {
    if (param.linting?.required && !param.visited) {
      diagnostics.push({
        from: objectNode.from,
        to: objectNode.to,
        message: `Property "${param.paramName}" is required for component "${componentType}"`,
        severity: "error",
      });
    }
  }

  if (children) {
    if (children.name !== "Array") {
      diagnostics.push({
        from: children.from,
        to: children.to,
        message: "Children must be of type Array",
        severity: "error",
      });
      return;
    }

    for (const child of children.getChildren("Object")) {
      iterateComponentTree(text, child, diagnostics);
    }
  }
};

const iterateCourseObject = (
  text: Text,
  objectNode: SyntaxNode,
  diagnostics: Diagnostic[]
) => {
  if (objectNode.name !== "Object") {
    diagnostics.push({
      from: objectNode.from,
      to: objectNode.to,
      message: "Course must be of type Object",
      severity: "error",
    });
    return;
  }

  const properties = [];
  let components;
  for (const node of objectNode.getChildren("Property")) {
    const property = extractProperty(text, node);
    if (!property) continue;

    if (property.propertyKey === "components") {
      components = node.lastChild;
    } else {
      properties.push({ node, property });
    }
  }

  const componentParams: (ParamWithType & {
    visited?: boolean;
  })[] = [...CourseParameters];

  for (const { node, property } of properties) {
    const paramIndex = componentParams.findIndex(
      (param) => param.paramName === property.propertyKey
    );

    if (paramIndex === -1) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        message: `Property "${property.propertyKey}" does not exist in the course object`,
        severity: "warning",
      });
    } else {
      const param = componentParams[paramIndex];
      if (param.linting) {
        if (param.linting.type !== node.lastChild!.name) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            message: `Property "${property.propertyKey}" must be of type "${param.linting.type}", not "${node.lastChild!.name}"`,
            severity: "error",
          });
        }
      }

      componentParams[paramIndex].visited = true;
    }
  }

  for (const param of componentParams) {
    if (param.linting?.required && !param.visited) {
      diagnostics.push({
        from: objectNode.from,
        to: objectNode.to,
        message: `Property "${param.paramName}" is required for the course object`,
        severity: "error",
      });
    }
  }

  if (!components) {
    diagnostics.push({
      from: objectNode.from,
      to: objectNode.to,
      message: "Course must have a components property",
      severity: "error",
    });
    return;
  }

  if (components.name !== "Array") {
    diagnostics.push({
      from: objectNode.from,
      to: objectNode.to,
      message: "Components must be of type Array",
      severity: "error",
    });
    return;
  }

  for (const component of components.getChildren("Object")) {
    iterateComponentTree(text, component, diagnostics);
  }
};

export const componentAndPropertiesLinter = (
  view: EditorView
): Diagnostic[] => {
  const startNode = syntaxTree(view.state).topNode.firstChild;

  if (!startNode) return [];

  const diagnostics: Diagnostic[] = [];

  iterateCourseObject(view.state.doc, startNode, diagnostics);

  return diagnostics;
};
