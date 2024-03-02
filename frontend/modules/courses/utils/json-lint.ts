import { SyntaxNode } from "@lezer/common";
import { Diagnostic } from "@codemirror/lint";
import { Text } from "@uiw/react-codemirror";

// return a list of diagnostics
// if nothing is wrong, return an empty list
export const getComponentDiagnostics = (
  text: Text,
  objectNode: SyntaxNode
): Diagnostic[] => {
  const diagnostics: Diagnostic[] = [];

  return diagnostics;
};
