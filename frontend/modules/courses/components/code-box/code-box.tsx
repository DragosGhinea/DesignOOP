import React, { useState } from "react";
import CodePrism from "./code-prism";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils/common";
import SelectLanguage from "./select-language";
import SelectFile from "./select-file";
import CopyCodeButton from "./copy-code-button";

export type CodeFileJson = {
  name: string;
  code: string;
  highlightLines?: number[];
};

export type CodeBoxJson = {
  [key: string]: {
    language: string;
    files: CodeFileJson[];
  };
};

const CodeBox = ({
  code,
  codeWrapperClassName,
  className,
}: {
  code: CodeBoxJson;
  codeWrapperClassName?: string;
  className?: string;
}) => {
  const languages = Object.keys(code);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const selectedCode = code[selectedLanguage];
  const [selectedCodeFile, setSelectedCodeFile] = useState(
    selectedCode.files[0]
  );

  const updateSelectedLanguage = (language: string) => {
    setSelectedLanguage(language);
    setSelectedCodeFile(code[language].files[0]);
  };

  return (
    <Card className={cn("text-sm overflow-x-hidden", className)}>
      <CardHeader className="flex flex-row flex-nowrap items-center justify-between bg-slate-100 p-2 shadow-sm">
        <SelectFile
          value={selectedCodeFile}
          setValue={setSelectedCodeFile}
          files={selectedCode.files}
        />
        <div className="flex items-center gap-2">
          <SelectLanguage
            value={selectedLanguage}
            setValue={updateSelectedLanguage}
            languages={languages}
          />
          <CopyCodeButton code={selectedCodeFile.code} />
        </div>
      </CardHeader>
      <CodePrism
        code={selectedCodeFile.code}
        highlightLines={selectedCodeFile.highlightLines}
        language={selectedCode.language}
        wrapperClassName={codeWrapperClassName}
      />
    </Card>
  );
};

export default CodeBox;
