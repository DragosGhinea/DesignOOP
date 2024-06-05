import React from "react";

const Paragraph = ({
  text,
  title,
  id,
}: {
  text: string;
  title: string;
  id?: string;
}) => {
  return (
    <div
      className="m-3 rounded-md border-[1px] border-gray-300 p-5 shadow-[0px_5px_20px_0px_#edf2f7] dark:border-2 dark:border-gray-700 dark:shadow-none"
      id={id}
    >
      <h3 className="h3-typography mb-5 leading-10">{title}</h3>
      <p lang="en" className="hyphens-auto text-justify">
        {text}
      </p>
    </div>
  );
};

export default Paragraph;
