import React from "react";
import Markdown from "react-markdown";

const MultiParagraph = ({
  text,
  title,
  id,
}: {
  text: string[];
  title: string;
  id?: string;
}) => {
  return (
    <div
      className="m-3 rounded-md border-[1px] border-gray-300 p-5 shadow-[0px_5px_20px_0px_#edf2f7] dark:border-2 dark:border-gray-700 dark:shadow-none"
      id={id}
    >
      <h3 className="h3-typography mb-5 leading-10">{title}</h3>
      <div className="flex flex-col gap-4">
        {text.map((paragraph, index) => (
          <div key={index} lang="en" className="hyphens-auto text-justify">
            <Markdown>{paragraph}</Markdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiParagraph;
