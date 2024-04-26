import React, { useState } from "react";
import CodeBox, { CodeBoxJson } from "./code-box";
import CodeBoxEditor from "./editor/code-box-editor";

const CodeBoxWithEdit = ({
  code,
  codeWrapperClassName,
  className,
}: {
  code: CodeBoxJson;
  codeWrapperClassName?: string;
  className?: string;
}) => {
  const [internalCode, setInternalCode] = useState<CodeBoxJson>(code);
  const [isEditing, setIsEditing] = useState(false);

  const saveCode = (code: CodeBoxJson) => {
    setInternalCode(code);
    setIsEditing(false);
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
