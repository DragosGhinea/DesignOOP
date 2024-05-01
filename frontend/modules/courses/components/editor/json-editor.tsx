"use client";

import React, { useCallback, useMemo, useState } from "react";
import CodeMirror, {
  Extension,
  ReactCodeMirrorRef,
  ViewUpdate,
} from "@uiw/react-codemirror";
import {
  linter,
  lintGutter,
  forEachDiagnostic,
  setDiagnosticsEffect,
} from "@codemirror/lint";
import { keymap, EditorView } from "@codemirror/view";
// import { json, jsonParseLinter } from "@codemirror/lang-json";
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
import CollapseAllButton from "./collapse-fold-button";
import CopyContentButton from "./copy-content-button";
import DownloadButton from "./download-button";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { wrappedLineIndent } from "codemirror-wrapped-line-indent";
import { jsonrepair } from "jsonrepair";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonParseLinter } from "../../utils/json-auto-repair-lint";
import { toast } from "sonner";
import { graphicWidgets } from "../../utils/json-graphic-replace";

const extensions = [
  graphicWidgets,
  courseJson(),
  jsonCodeFolding(),
  lintGutter(),
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
  EditorView.lineWrapping,
  wrappedLineIndent,
] as Extension[];

const isLinterDoneEffect = (transactions: ViewUpdate["transactions"]) => {
  for (const tr of transactions) {
    for (const effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        return true;
      }
    }
  }

  return false;
};

const JSONEditor = () => {
  const { resolvedTheme } = useTheme();
  const { initialCourseJSON, setInEditCourseJSON } = useCourseJSON();
  const [jsonToRepair, setJsonToRepair] = useState<string>("");

  const codeRef = React.useRef<ReactCodeMirrorRef>(null);

  const themeCodeMirror = resolvedTheme === "dark" ? xcodeDark : xcodeLight;

  const jsonParseLint = useMemo(
    () => linter(jsonParseLinter(setJsonToRepair), { delay: 600 }),
    [setJsonToRepair]
  );

  const autoRepairAttempt = useCallback(
    (jsonToRepair: string) => {
      const promise = new Promise<void>((resolve) => {
        const repaired = jsonrepair(jsonToRepair);
        if (repaired) {
          codeRef.current?.view?.dispatch({
            changes: {
              from: 0,
              to: codeRef.current.view.state.doc.length,
              insert: repaired,
            },
          });
          setJsonToRepair("ignored");
          resolve();
        }
      });
      toast.promise(promise, {
        loading: "Auto-repairing JSON...",
        success: "JSON auto-repaired successfully",
        error: "Failed to auto-repair JSON, please fix it manually",
        duration: 3000,
      });
    },
    [setJsonToRepair]
  );

  const debouncedUpdate = useDebounceCallback((viewUpdate: ViewUpdate) => {
    let errors = 0;
    forEachDiagnostic(viewUpdate.state, (diagnostic) => {
      if (diagnostic.severity === "error") errors++;
    });

    if (errors !== 0) return;

    try {
      setInEditCourseJSON(JSON.parse(viewUpdate.state.doc.toString()));
    } catch (e) {
      console.error(e);
    }
  }, 500);

  return (
    <>
      <div className="pointer-events-none absolute z-50 flex w-full items-center justify-end gap-3 p-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <CollapseAllButton codeRef={codeRef} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">Folding toggle</p>
          </TooltipContent>
        </Tooltip>

        <CopyContentButton codeRef={codeRef} />

        <Tooltip>
          <TooltipTrigger asChild>
            <DownloadButton codeRef={codeRef} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">Download JSON</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <CodeMirror
        ref={codeRef}
        lang="json"
        extensions={[...extensions, jsonParseLint]}
        theme={themeCodeMirror}
        value={JSON.stringify(initialCourseJSON, null, 2)}
        onUpdate={(viewUpdate) => {
          if (!isLinterDoneEffect(viewUpdate.transactions)) return;
          debouncedUpdate(viewUpdate);
        }}
      />

      {jsonToRepair && jsonToRepair !== "ignored" && (
        <div className="absolute bottom-0 z-[49] w-full bg-destructive p-3 text-destructive-foreground @container">
          <div className="flex flex-col items-center gap-3 @md:flex-row">
            <AlertCircleIcon className="size-10 min-w-[20px]" />
            <div className="flex flex-col">
              <h6 className="h6-typography font-bold">Invalid JSON</h6>
              <p>
                The current JSON is not parsable. Would you like to try
                auto-repairing it?
              </p>
            </div>
            <div className="flex flex-1 justify-end gap-5">
              <Button onClick={() => setJsonToRepair("ignored")}>Ignore</Button>
              <Button onClick={() => autoRepairAttempt(jsonToRepair)}>
                Try Auto-Repair
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JSONEditor;
