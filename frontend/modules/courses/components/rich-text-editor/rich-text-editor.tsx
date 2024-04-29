/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React, { useState } from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import Focus from "@tiptap/extension-focus";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "@/components/ui/card";
import {
  Bold,
  EyeIcon,
  Italic,
  StrikethroughIcon,
  Underline,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import UnderlineExtension from "@tiptap/extension-underline";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";

const extensions = [
  UnderlineExtension,
  Focus.configure({
    mode: "deepest",
  }),
  Placeholder.configure({
    placeholder: "Start typing...",
    showOnlyCurrent: false,
  }),
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

const MarkupGroup = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1">
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            value="bold"
            aria-label="Toggle bold"
            pressed={editor.isActive("bold")}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="size-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bold</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            value="italic"
            aria-label="Toggle italic"
            pressed={editor.isActive("italic")}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="size-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom">Italic</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            value="underline"
            aria-label="Toggle underline"
            pressed={editor.isActive("underline")}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline className="size-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom">Underline</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            value="strike"
            aria-label="Toggle strike"
            pressed={editor.isActive("strike")}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon className="size-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom">Strikethrough</TooltipContent>
      </Tooltip>
    </div>
  );
};

const HideEditorButton = ({ setEditing }: { setEditing: any }) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Button onClick={() => setEditing(false)}>
      <EyeIcon className="size-4" />
    </Button>
  );
};

const RichTextEditor = () => {
  const [editing, setEditing] = useState<boolean>(true);

  return (
    <EditorProvider
      editorProps={{
        attributes: {
          class: "nodrag nowheel cursor-default",
        },
      }}
      editable={editing}
      extensions={extensions}
      content={"<div>test</div>"}
      slotAfter={
        <Card className="fixed -bottom-14 left-0 flex gap-2 p-1">
          {editing && (
            <Button variant="success" onClick={() => setEditing(false)}>
              <EyeIcon className="size-4" />
            </Button>
          )}
          <MarkupGroup />
        </Card>
      }
    >
      <></>
    </EditorProvider>
  );
};

export default RichTextEditor;
