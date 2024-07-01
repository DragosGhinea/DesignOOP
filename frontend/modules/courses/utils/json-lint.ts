import { SyntaxNode } from "@lezer/common";
import { Diagnostic } from "@codemirror/lint";
import { EditorView, Text } from "@uiw/react-codemirror";
import { syntaxTree } from "@codemirror/language";
import { extractProperty } from "./json-syntax-tree-helper";
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
  if (objectNode.name !== "Component") {
    diagnostics.push({
      from: objectNode.from,
      to: objectNode.to,
      message:
        "Component must be an object containing a componentType property",
      severity: "error",
    });
    return;
  }

  const componentTypeNode = objectNode.getChild("ComponentTypeProperty");
  if (!componentTypeNode) return;

  const componentTypeValueNode = componentTypeNode.lastChild!; // we know it exists since that's how the grammar is defined

  if (componentTypeValueNode.name !== "String") {
    diagnostics.push({
      from: componentTypeValueNode.from,
      to: componentTypeValueNode.to,
      message: "componentType must be of type String",
      severity: "error",
    });
    return;
  }

  const componentType = text.sliceString(
    componentTypeValueNode.from + 1,
    componentTypeValueNode.to - 1
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

  const properties = [];
  for (const node of objectNode.getChildren("Property")) {
    const property = extractProperty(text, node);
    if (!property) continue;

    properties.push({ node, property });
  }

  const componentParams: ((ParamWithType | ParamWithLiteralValues) & {
    visited?: boolean;
  })[] = [...Components[componentType].params.map((param) => ({ ...param, visited: false }))];

  for (const { node, property } of properties) {
    // skip special property
    if (property.propertyKey === "contentTable") {
      continue;
    }

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

      if ("literalValues" in param) {
        const literalValues = param.literalValues;
        if (!literalValues.includes(text.sliceString(node.lastChild!.from, node.lastChild!.to))) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            message: `Property "${property.propertyKey}" must be one of ${literalValues.join(" | ")}`,
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

  const childrenNode = objectNode.getChild("ChildrenProperty");
  const childrenValueNode = childrenNode?.lastChild;
  if (childrenValueNode) {
    if (!Components[componentType].hasChildren) {
      diagnostics.push({
        from: childrenNode.from,
        to: childrenNode.to,
        message: `Component "${componentType}" does not accept children`,
        severity: "error",
      });
      return;
    }

    if (childrenValueNode.name !== "Array") {
      diagnostics.push({
        from: childrenValueNode.from,
        to: childrenValueNode.to,
        message: "Children must be of type Array",
        severity: "error",
      });
      return;
    }

    for (const child of childrenValueNode.getChildren("Component")) {
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
  })[] = [...CourseParameters.map((param) => ({ ...param, visited: false }))];

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

  for (const component of components.getChildren("Component")) {
    iterateComponentTree(text, component, diagnostics);
  }
  for (const child of components.getChildren("Object")) {
    diagnostics.push({
      from: child.from,
      to: child.to,
      message: "Component does not have a componentType property",
      severity: "error",
    });
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
