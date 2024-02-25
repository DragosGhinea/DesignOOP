import React from "react";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { linter, lintGutter } from "@codemirror/lint";
import { EditorView } from "codemirror";
import { json } from "@codemirror/lang-json";
import { StreamLanguage } from "@codemirror/language";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { useTheme } from "next-themes";
import useCourseJSON from "../../hooks/use-course-json";

const JSONEditor = () => {
  const { resolvedTheme } = useTheme();
  const { courseJSON, setCourseJSON } = useCourseJSON();

  const themeCodeMirror = resolvedTheme === "dark" ? xcodeDark : xcodeLight;

  return (
    <CodeMirror
      lang="json"
      extensions={[json(), lintGutter()]}
      theme={themeCodeMirror}
      className="border-2"
      value={JSON.stringify(courseJSON, null, 2)}
      onChange={(value) => {
        setCourseJSON(JSON.parse(value));
      }}
    />
  );
};

export default JSONEditor;
