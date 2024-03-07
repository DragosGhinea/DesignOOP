import { parser } from "./lezer-parser/lezer-parser";
import {
  continuedIndent,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  LRLanguage,
  LanguageSupport,
} from "@codemirror/language";

export const jsonLanguage = LRLanguage.define({
  name: "courseJson",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({ except: /^\s*\}/ }),
        Array: continuedIndent({ except: /^\s*\]/ }),
      }),
      foldNodeProp.add({
        "Component Object Array": foldInside,
      }),
    ],
  }),
  languageData: {
    closeBrackets: { brackets: ["[", "{", '"'] },
    indentOnInput: /^\s*[}\]]$/,
  },
});

/// JSON language support.
export function courseJson() {
  return new LanguageSupport(jsonLanguage);
}
