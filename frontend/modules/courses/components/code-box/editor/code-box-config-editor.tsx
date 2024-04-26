import React from "react";

import CodeMirror, {
  Extension,
  ReactCodeMirrorRef,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { linter, lintGutter } from "@codemirror/lint";
import { keymap, EditorView } from "@codemirror/view";
import { jsonParseLinter } from "@codemirror/lang-json";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { useTheme } from "next-themes";
import { useDebounceCallback } from "usehooks-ts";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { wrappedLineIndent } from "codemirror-wrapped-line-indent";
import { CodeBoxJson } from "../code-box";

const extensions = [
  linter(jsonParseLinter()),
  lintGutter(),
  indentationMarkers({
    highlightActiveBlock: true,
    hideFirstIndent: true,
    thickness: 1.5,
    colors: {
      light: "#AAAAAA",
      dark: "#424242",
      activeLight: "#FFA500",
      activeDark: "#FFD700",
    },
  }),
  keymap.of(vscodeKeymap),
  EditorView.lineWrapping,
  wrappedLineIndent,
] as Extension[];

const CodeBoxConfigEditor = ({
  codeBoxJson,
  setCodeBoxJson,
}: {
  codeBoxJson: CodeBoxJson;
  setCodeBoxJson: (json: CodeBoxJson) => void;
}) => {
  const { resolvedTheme } = useTheme();
  const themeCodeMirror = resolvedTheme === "dark" ? xcodeDark : xcodeLight;

  const codeRef = React.useRef<ReactCodeMirrorRef>(null);
  const debouncedUpdate = useDebounceCallback((viewUpdate: ViewUpdate) => {
    const code = viewUpdate.state.doc.toString();
    try {
      const parsed = JSON.parse(code);
      setCodeBoxJson(parsed);
    } catch (e) {
      // noop
    }
  }, 500);

  return (
    <div>
      <h5 className="h5-typography px-2 font-bold">Code Box Config</h5>
      <div className="px-5">
        <p className="text-muted-foreground">
          The actual config of the code box that will be saved and used for the
          code box.
        </p>
        <CodeMirror
          ref={codeRef}
          lang="json"
          extensions={[...extensions]}
          theme={themeCodeMirror}
          value={JSON.stringify(codeBoxJson, null, 2)}
          onUpdate={(viewUpdate) => {
            debouncedUpdate(viewUpdate);
          }}
        />
      </div>
    </div>
  );
};

export default CodeBoxConfigEditor;
