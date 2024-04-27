import React from "react";
import { HandleProps, NodeProps, NodeResizer } from "reactflow";
import CodeBoxWithEdit from "../../code-box/code-box-with-edit";
import { CodeBoxJson } from "../../code-box/code-box";
import CustomHandle from "../handles/CustomHandle";

const javaCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

const javaCodeWithHighlight = `public class ArithmeticExample {
    public static void main(String[] args) {
        int number1 = 10;
        int number2 = 5;

        int sum = number1 + number2;
        System.out.println("Sum: " + sum);

        int difference = number1 - number2;
        System.out.println("Difference: " + difference);

        int product = number1 * number2;
        System.out.println("Product: " + product);

        int quotient = number1 / number2;
        System.out.println("Quotient: " + quotient);

        int remainder = number1 % number2;
        System.out.println("Remainder: " + remainder);
    }
}`;

const exampleCodeBoxJson = {
  Java: {
    language: "java",
    files: [
      {
        name: "Main.java",
        code: javaCode,
      },
      {
        name: "ArithmeticExample.java",
        code: javaCodeWithHighlight,
        highlightLines: [3, 4, 15],
      },
    ],
  },
} as CodeBoxJson;

const CodeNode = (props: NodeProps) => {
  const resizable = props.data.resizable ?? false;
  const customHandles: (HandleProps & { width: string; height: string })[] =
    props.data.customHandles ?? [];

  return (
    <>
      {customHandles.map((handle) => (
        <CustomHandle key={handle.id} nodeId={props.id} {...handle} />
      ))}

      <div className="size-full">
        <NodeResizer
          isVisible={resizable}
          minWidth={100}
          minHeight={100}
          handleClassName="p-1"
        />
        <CodeBoxWithEdit
          code={exampleCodeBoxJson}
          className="h-full overflow-hidden dark:border-2 dark:border-slate-500"
          codeWrapperClassName="nodrag nowheel cursor-default"
        />
      </div>
    </>
  );
};

export default CodeNode;
