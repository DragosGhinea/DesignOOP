import React from "react";
import CodeMirror, {
  Extension,
  ReactCodeMirrorRef,
  Text,
  ViewUpdate,
  hoverTooltip,
} from "@uiw/react-codemirror";
import { linter, lintGutter } from "@codemirror/lint";
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

const extensions = [
  json(),
  linter(jsonParseLinter(), {
    // default is 750ms
    delay: 300,
  }),
  linter(componentAndPropertiesLinter, {
    delay: 300,
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
