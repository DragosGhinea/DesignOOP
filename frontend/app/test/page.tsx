"use client";

import React from "react";
import CodeBox from "@/modules/courses/components/code-box/code-box";
import Navbar from "@/components/navbar/navbar";
import CodeBoxEditor from "@/modules/courses/components/code-box/editor/code-box-editor";
import CodeBoxWithEdit from "@/modules/courses/components/code-box/code-box-with-edit";

const code = `function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`;

const code2 = `function AnotherComponent() {
  return <div>Another component</div>;
}`;

const longCode = `function LongCode() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a long code snippet.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
      <p>It has multiple lines.</p>
    </div>
  );
}`;

const codeBoxJson = {
  TypeScript: {
    language: "tsx",
    files: [
      {
        name: "MyComponent.tsx",
        code,
        highlightLines: [2, 3, 5],
      },
      {
        name: "AnotherComponent.tsx",
        code: code2,
      },
      {
        name: "LongCode.tsx",
        code: longCode,
      },
    ],
  },
  JavaScript: {
    language: "jsx",
    files: [
      {
        name: "MyComponent.jsx",
        code,
        highlightLines: [1, 2],
      },
    ],
  },
};

const Test = () => {
  return (
    <>
      <Navbar />
      <div className="p-60">
        <CodeBoxWithEdit code={codeBoxJson} codeWrapperClassName="max-h-[200px]" />
      </div>
    </>
  );
};

export default Test;
