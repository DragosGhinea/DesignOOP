import { SyntaxNode } from "@lezer/common";
import { Diagnostic } from "@codemirror/lint";
import { Text } from "@uiw/react-codemirror";

const extractProperty = (text: Text, property: SyntaxNode) => {
  const propertyName = property.firstChild;
  const value = property.lastChild;

  if (!propertyName) {
    return;
  }

  if (!value) {
    return;
  }

  const propertyKey = text.sliceString(propertyName.from, propertyName.to);
  const propertyValue = text.sliceString(value.from, value.to);

  return { propertyKey, propertyValue };
};

const getComponentType = (text: Text, objectNode: SyntaxNode) => {
  if (objectNode.name !== "Object") {
    return null;
  }

  for (const node of objectNode.getChildren("Property")) {
    const property = extractProperty(text, node);
    if (!property) continue;

    if (property.propertyKey === "componentType") {
      return property.propertyValue;
    }
  }
};

// return a list of diagnostics
// if nothing is wrong, return an empty list
const getComponentDiagnostics(text: Text, objectNode: SyntaxNode) => {
    const diagnostics : Diagnostic[] = [];

    

    return diagnostics;
}
