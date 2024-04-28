"use client";

import React from "react";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextDisplay = ({ content }: { content: Content }) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content,
  });

  return <EditorContent editor={editor} className="size-full" />;
};

export default RichTextDisplay;
