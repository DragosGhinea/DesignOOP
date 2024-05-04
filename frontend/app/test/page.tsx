"use client";

import React from "react";
import Navbar from "@/components/navbar/navbar";
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
        <div className="relative z-10 flex size-full cursor-pointer items-center overflow-hidden rounded-xl border p-[1.5px]">
          <div className="absolute inset-0 left-[-450%] top-[-450%] size-[1000%] animate-border-spin rounded-full bg-[conic-gradient(#0ea5e9_0deg,#0ea5e9_0deg,transparent_80deg)]"></div>
          <CodeBoxWithEdit
            code={codeBoxJson}
            className="z-10 size-full"
            codeWrapperClassName="max-h-[200px]"
          />
        </div>
      </div>
    </>
  );
};

export default Test;
