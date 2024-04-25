import { cn } from "@/utils/common";
import React from "react";
import { CodeFileJson } from "./code-box";

const SelectFile = ({
  value,
  setValue,
  files,
}: {
  value: CodeFileJson;
  setValue: (value: CodeFileJson) => void;
  files: CodeFileJson[];
}) => {
  return (
    <div className="flex">
      {files.map((file) => (
        <button
          key={file.name}
          onClick={() => setValue(file)}
          disabled={value === file}
          className={cn(
            "rounded-md px-2 text-sm font-medium text-gray-700",
            value === file && "text-blue-300"
          )}
        >
          {file.name}
        </button>
      ))}
    </div>
  );
};

export default SelectFile;
