import { Extension } from "@uiw/react-codemirror";
import { codeFolding, syntaxTree } from "@codemirror/language";
import { getComponentType } from "./json-syntax-tree";

export function jsonCodeFolding(): Extension {
  return codeFolding({
    preparePlaceholder: (state, range) => {
      const node = syntaxTree(state).cursorAt(range.from).node;
      const componentType = getComponentType(state.doc, node);
      if (componentType)
        return `...${componentType}...`;

      return "...";
    },
    placeholderDOM: (_view, onclick, prepared) => {
      const element = document.createElement("span");
      element.textContent = prepared;
      element.setAttribute("aria-label", "folded code");
      element.title = prepared === "..." ? "unfold" : "unfold component";
      //   element.className = "cm-foldPlaceholder"
      element.className = "italic small text-muted-foreground cursor-pointer px-3";
      element.onclick = onclick;
      return element;
    },
  });
}
