import React from "react";
import CodeMirror, {
  Extension,
  ReactCodeMirrorRef,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { linter, lintGutter, forEachDiagnostic } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { useTheme } from "next-themes";
import useCourseJSON from "../../hooks/use-course-json";
import { useDebounceCallback } from "usehooks-ts";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { autocompletion } from "@codemirror/autocomplete";
import { componentSnippets } from "../../utils/json-autocomplete-components";
import { propertyAutocomplete } from "../../utils/json-autocomplete-properties";
import { componentAndPropertiesLinter } from "../../utils/json-lint";
import { jsonCodeFolding } from "../../utils/json-custom-fold";
import { courseJson } from "../../utils/json-course-language";

const extensions = [
  courseJson(),
  jsonCodeFolding(),
  lintGutter(),
  linter(jsonParseLinter(), {
    // default is 750ms
    delay: 600,
  }),
  linter(componentAndPropertiesLinter, {
    delay: 600,
  }),
  autocompletion({ override: [componentSnippets, propertyAutocomplete] }),
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
] as Extension[];

const JSONEditor = () => {
  const { resolvedTheme } = useTheme();
  const { courseJSON, setCourseJSON } = useCourseJSON();

  const codeRef = React.useRef<ReactCodeMirrorRef>(null);

  const themeCodeMirror = resolvedTheme === "dark" ? xcodeDark : xcodeLight;

  const debouncedChange = useDebounceCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      let errors = 0;
      forEachDiagnostic(viewUpdate.state, (diagnostic) => {
        if (diagnostic.severity === "error") errors++;
      });

      if (errors !== 0) return;

      try {
        setCourseJSON(JSON.parse(value));
      } catch (e) {}
    },
    500
  );

  return (
    <CodeMirror
      ref={codeRef}
      lang="json"
      extensions={extensions}
      theme={themeCodeMirror}
      value={JSON.stringify(courseJSON, null, 2)}
      onMouseDown={(event) => {
        // console.log("CLICK");
        // const position = codeRef.current!.view!.posAtCoords({
        //   x: event.clientX,
        //   y: event.clientY,
        // }) as number;
        // const syntaxNode = syntaxTree(codeRef.current!.view!.state).resolve(
        //   position
        // );
        // console.log(
        //   getComponentType(codeRef.current!.view!.state.doc, syntaxNode.node)
        // );
      }}
      onChange={debouncedChange}
      // onChange={(value, viewUpdate) => {
      //   console.log(value);
      //   syntaxTree(viewUpdate.state).cursor().iterate(node => {
      //     console.log(node.name, node.from, node.to, node);
      //   });
      // }}
    />
  );
};

export default JSONEditor;
