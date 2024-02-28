import React from "react";

const Paragraph = ({ text, title }: { text: string, title: string }) => {
  return <div><h1>Paragraph {text} {title}</h1></div>;
};

export default Paragraph;
