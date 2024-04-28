/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React, { useState } from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
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

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1">
      <Toggle
        value="bold"
        aria-label="Toggle bold"
        pressed={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle value="italic" aria-label="Toggle italic">
        <Italic className="size-4" />
      </Toggle>
      <Toggle value="underline" aria-label="Toggle underline">
        <Underline className="size-4" />
      </Toggle>
    </div>
  );
};

const RichTextEditor = () => {
  const [editing, setEditing] = useState<boolean>(true);

  return (
    <EditorProvider
      editorProps={{
        attributes: {
          class:
            "nodrag nowheel cursor-default",
        },
      }}
      editable={editing}
      extensions={extensions}
      content={'<div>test</div>'}
      slotAfter={
        <Card className="fixed -bottom-14 left-0 p-1">
          <MenuBar />
        </Card>
      }
    >
      <></>
    </EditorProvider>
  );
};

export default RichTextEditor;
