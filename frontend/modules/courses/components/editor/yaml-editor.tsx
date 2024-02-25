import React from "react";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { linter, lintGutter } from "@codemirror/lint";
import { EditorView } from "codemirror";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { StreamLanguage } from "@codemirror/language";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { useTheme } from "next-themes";
import YAML from "js-yaml";
import useCourseJSON from "../../hooks/use-course-json";

const yamlLegacy = StreamLanguage.define(yaml);

const yamlLinter: Extension = linter((view: EditorView) => {
  const yamlText = view.state.doc.toString();
  const diagnostics: {
    from: number;
    to: number;
    message: string;
    severity: "error" | "warning";
  }[] = [];

  try {
    YAML.load(yamlText);
  } catch (error: any) {
    const mark = error.mark;
    diagnostics.push({
      from: mark.position ?? 0,
      to: mark.position ?? 0,
      message: error.message,
      severity: "error",
    });
  }

  return diagnostics;
});

const YamlEditor = () => {
  const { resolvedTheme } = useTheme();
  const { courseJSON, setCourseJSON } = useCourseJSON();

  const themeCodeMirror = resolvedTheme === "dark" ? xcodeDark : xcodeLight;

  return (
    <CodeMirror
      lang="yaml"
      extensions={[yamlLegacy, lintGutter(), yamlLinter]}
      theme={themeCodeMirror}
      className="border-2"
      value={YAML.dump(courseJSON)}
      onChange={(value) => {
        setCourseJSON(YAML.load(value) as JSON);
      }}
    />
  );
};

export default YamlEditor;
