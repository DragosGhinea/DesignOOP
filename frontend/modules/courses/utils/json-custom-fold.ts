import { Extension } from "@uiw/react-codemirror";
import { codeFolding, syntaxTree } from "@codemirror/language";

export function jsonCodeFolding(): Extension {
  return codeFolding({
    preparePlaceholder: (state, range) => {
      const nodeRef = syntaxTree(state).cursorAt(range.from);
      if (nodeRef.name !== "Component") return "...";

      const node = nodeRef.node;
      const componentTypeValueNode = node.getChild(
        "ComponentTypeProperty"
      )!.lastChild!;
      if (componentTypeValueNode.name !== "String")
        return "...invalid componentType...";

      const componentType = state.doc.sliceString(
        componentTypeValueNode.from+1,
        componentTypeValueNode.to-1
      );
      return `...${componentType}...`;
    },
    placeholderDOM: (_view, onclick, prepared) => {
      const element = document.createElement("span");
      element.textContent = prepared;
      element.setAttribute("aria-label", "folded code");
      element.title = prepared === "..." ? "unfold" : "unfold component";
      element.className =
        "italic small text-muted-foreground cursor-pointer px-3";
      element.onclick = onclick;
      return element;
    },
  });
}
