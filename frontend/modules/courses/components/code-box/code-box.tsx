import React, { useState } from "react";
import CodePrism from "./code-prism";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils/common";
import SelectLanguage from "./select-language";
import SelectFile from "./select-file";
import CopyCodeButton from "./copy-code-button";
import EditCodeButton from "./edit-code-button";
import { useLocalStorage } from "usehooks-ts";

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
  onEditButtonClick,
}: {
  code: CodeBoxJson;
  codeWrapperClassName?: string;
  className?: string;
  onEditButtonClick?: () => void;
}) => {
  const isEditable = !!onEditButtonClick;
  const languages = Object.keys(code);
  const [preferedLanguage, setPreferedLanguage] = useLocalStorage<string>(
    "preferedCodeLanguage",
    ""
  );
  const selectedLanguage = languages.includes(preferedLanguage)
    ? preferedLanguage
    : languages[0];
  const selectedCode = code[selectedLanguage];
  const [selectedCodeFile, setSelectedCodeFile] = useState(
    selectedCode.files[0]
  );

  // recommended approch
  // https://react.dev/learn/you-might-not-need-an-effect
  const [prevSelectedCode, setPrevSelectedCode] = useState(selectedCode);
  if (prevSelectedCode !== selectedCode) {
    setPrevSelectedCode(selectedCode);
    setSelectedCodeFile(selectedCode.files[0]);
  }

  const updateSelectedLanguage = (language: string) => {
    // setSelectedLanguage(language);
    // setSelectedCodeFile(code[language].files[0]);
    setPreferedLanguage(language);
  };

  return (
    <Card className={cn("text-xs overflow-x-hidden flex flex-col", className)}>
      <CardHeader className="flex flex-row flex-nowrap items-center justify-between gap-3 bg-slate-100 p-2 shadow-sm dark:bg-dark-300">
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
          {isEditable && <EditCodeButton onClick={onEditButtonClick} />}
        </div>
      </CardHeader>
      <CodePrism
        code={selectedCodeFile.code}
        highlightLines={selectedCodeFile.highlightLines}
        language={selectedCode.language}
        wrapperClassName={cn("grow overflow-y-hidden", codeWrapperClassName)}
      />
    </Card>
  );
};

export default CodeBox;
