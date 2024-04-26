import React, { useState } from "react";
import CodeBox, { CodeBoxJson } from "./code-box";
import CodeBoxEditor from "./editor/code-box-editor";

const CodeBoxWithEdit = ({
  code,
  codeWrapperClassName,
  className,
  onSave,
}: {
  code: CodeBoxJson;
  codeWrapperClassName?: string;
  className?: string;
  onSave?: (code: CodeBoxJson) => void;
}) => {
  const [internalCode, setInternalCode] = useState<CodeBoxJson>(code);
  const [isEditing, setIsEditing] = useState(false);

  const saveCode = (code: CodeBoxJson) => {
    setInternalCode(code);
    setIsEditing(false);
    if (onSave) onSave(code);
  };

  return (
    <>
      <CodeBox
        className={className}
        codeWrapperClassName={codeWrapperClassName}
        code={internalCode}
        onEditButtonClick={() => {
          setIsEditing(true);
        }}
      />
      <CodeBoxEditor
        code={internalCode}
        saveCode={saveCode}
        isOpen={isEditing}
        setOpen={setIsEditing}
      />
    </>
  );
};

export default CodeBoxWithEdit;
