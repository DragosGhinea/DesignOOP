"use client";

import React from "react";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Focus from "@tiptap/extension-focus";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExtension from "@tiptap/extension-underline";

const extensions = [
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  UnderlineExtension,
  Focus.configure({
    className: "border-2 border-green-500 rounded-sm",
    mode: "all",
  }),
  Placeholder.configure({
    placeholder: "Start typing...",
    showOnlyCurrent: false,
    includeChildren: true,
  }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const RichTextDisplay = ({ content }: { content: Content }) => {
  const editor = useEditor({
    editable: false,
    extensions,
    content,
  });

  return (
    <EditorContent editor={editor} className="rich-text focus:outline-none" />
  );
};

export default RichTextDisplay;
