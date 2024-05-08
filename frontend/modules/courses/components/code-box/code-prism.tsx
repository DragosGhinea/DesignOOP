"use client";

import LoadingSpinner from "@/components/loading/loading-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/common";
import { useTheme } from "next-themes";
import { themes, Highlight, PrismTheme, Prism } from "prism-react-renderer";
import React, { useEffect, useState } from "react";

(typeof global !== "undefined" ? global : window).Prism = Prism;

const CodePrism = ({
  code,
  language,
  highlightLines,
  wrapperClassName,
}: {
  code: string;
  language: string;
  highlightLines?: number[];
  wrapperClassName?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<PrismTheme | undefined>();

  require(`prismjs/components/prism-${language}`);

  useEffect(() => {
    setTheme(resolvedTheme === "dark" ? themes.vsDark : themes.vsLight);
  }, [resolvedTheme]);

  if (!theme) return <LoadingSpinner text="Loading code..." />;

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={cn("flex py-4", className, wrapperClassName)}
        >
          <ScrollArea className="w-full">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className={cn(
                  "relative border-l-2 border-transparent pl-4",
                  highlightLines?.includes(i + 1) &&
                    "bg-blue-100 border-l-2 border-blue-600 dark:bg-blue-dark"
                )}
              >
                <span className="mr-3 inline-block w-5 select-none text-right text-slate-500">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </ScrollArea>
        </pre>
      )}
    </Highlight>
  );
};

export default CodePrism;
