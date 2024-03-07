import { SyntaxNode } from "@lezer/common";
import { Text } from "@uiw/react-codemirror";

export const extractProperty = (text: Text, property: SyntaxNode) => {
  const propertyName = property.firstChild;
  const value = property.lastChild;

  if (!propertyName) {
    return;
  }

  if (!value) {
    return;
  }

  const propertyKey = text.sliceString(
    propertyName.from + 1,
    propertyName.to - 1
  );
  const propertyValue = text.sliceString(value.from, value.to);

  return { propertyKey, propertyValue };
};

export const getPresentPropertyNames = (text: Text, objectNode: SyntaxNode) => {
  if (objectNode.name !== "Object") {
    return [];
  }

  const presentPropertyNames: string[] = [];

  for (const node of objectNode.getChildren("Property")) {
    const property = extractProperty(text, node);
    if (!property) continue;

    presentPropertyNames.push(property.propertyKey);
  }

  return presentPropertyNames;
};
