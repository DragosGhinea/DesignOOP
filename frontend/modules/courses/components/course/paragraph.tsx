import React from "react";

const Paragraph = ({ text, title }: { text: string; title: string }) => {
  return (
    <div className="m-3 rounded-sm border-2 p-3">
      <h3 className="h3-typography">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Paragraph;
