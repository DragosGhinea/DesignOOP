"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CodeBoxJson } from "../code-box";
import React, { useState } from "react";
import CodeInputs from "./code-inputs";
import CodeBoxConfigEditor from "./code-box-config-editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { triggerDownload } from "@/modules/courses/utils/json-download";
import { VerifiedIcon } from "lucide-react";

type CodeBoxEditorProps = {
  codes: { [key: string]: string };
} & CodeBoxJson;

const extractCodes = (code: CodeBoxJson): CodeBoxEditorProps => {
  const editor: { [key: string]: string } = {};
  const editorCode = JSON.parse(JSON.stringify(code)) as CodeBoxEditorProps;
  Object.entries(code).forEach(([key, value]) => {
    value.files.forEach((file, index) => {
      editor[`${key}-${index}`] = file.code;
      editorCode[key].files[index].code = `%${key}-${index}%`;
    });
  });

  return { ...editorCode, codes: editor } as CodeBoxEditorProps;
};

const convertEditorToBox = (props: CodeBoxEditorProps) => {
  const codes = props.codes;
  const code = JSON.parse(
    JSON.stringify({ ...props, codes: undefined })
  ) as unknown as CodeBoxJson;

  for (const key in code) {
    code[key].files.forEach((file) => {
      file.code =
        codes[file.code.substring(1, file.code.length - 1)] ||
        "Unknown code snippet: " + file.code;
    });
  }

  return code;
};

const CodeBoxEditor = ({
  code,
  isOpen,
  setOpen,
  saveCode,
}: {
  code: CodeBoxJson;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  saveCode: (code: CodeBoxJson) => void;
}) => {
  const [inEditCode, setInEditCode] = useState<CodeBoxEditorProps>(
    extractCodes(code)
  );

  const updateCodes = (key: string, value: string | undefined) => {
    setInEditCode((prevCode) => {
      if (value === undefined) {
        const newCodes = { ...prevCode.codes };
        delete newCodes[key];
        return {
          ...prevCode,
          codes: newCodes,
        } as CodeBoxEditorProps;
      }

      return {
        ...prevCode,
        codes: {
          ...prevCode.codes,
          [key]: value,
        },
      } as CodeBoxEditorProps;
    });
  };

  const updateConfig = (codeBoxJson: CodeBoxJson) => {
    setInEditCode((prevCode) => ({ ...prevCode, ...codeBoxJson }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="overflow-y-auto lg:max-w-[90%]">
        <ScrollArea className="max-h-[80vh] px-5">
          <div className="flex flex-col gap-8">
            <h3 className="h3-typography font-bold">Code Box Editor</h3>

            <CodeInputs codes={inEditCode.codes} updateCodes={updateCodes} />

            <CodeBoxConfigEditor
              codeBoxJson={
                { ...inEditCode, codes: undefined } as unknown as CodeBoxJson
              }
              setCodeBoxJson={updateConfig}
            />
            <div className="flex items-center justify-between gap-2 rounded-sm bg-slate-200 px-3 py-4 dark:bg-slate-900">
              <Button
                onClick={() => {
                  const finalCode = convertEditorToBox(inEditCode);
                  saveCode(finalCode);
                }}
                className="flex items-center gap-2"
                variant="success"
              >
                <VerifiedIcon />
                Save
              </Button>
              <Button
                onClick={() => {
                  triggerDownload(
                    JSON.stringify(convertEditorToBox(inEditCode), null, 2),
                    "computed-code-box.json"
                  );
                }}
                variant="outline"
              >
                Download Computed
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CodeBoxEditor;
