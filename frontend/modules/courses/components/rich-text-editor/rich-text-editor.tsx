/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React, { useState } from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import Focus from "@tiptap/extension-focus";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "@/components/ui/card";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  EyeIcon,
  EyeOffIcon,
  Italic,
  StrikethroughIcon,
  Underline,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import UnderlineExtension from "@tiptap/extension-underline";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import TextSizeIcon from "@/components/icons/text-size-icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
      <Toggle
        value="bold"
        aria-label="Toggle bold"
        pressed={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Bold className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Bold</TooltipContent>
        </Tooltip>
      </Toggle>
      <Toggle
        value="italic"
        aria-label="Toggle italic"
        pressed={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Italic className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Italic</TooltipContent>
        </Tooltip>
      </Toggle>
      <Toggle
        value="underline"
        aria-label="Toggle underline"
        pressed={editor.isActive("underline")}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Underline className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Underline</TooltipContent>
        </Tooltip>
      </Toggle>
      <Toggle
        value="strike"
        aria-label="Toggle strike"
        pressed={editor.isActive("strike")}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <StrikethroughIcon className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Strikethrough</TooltipContent>
        </Tooltip>
      </Toggle>
    </div>
  );
};

const TextSize = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const activeTextStyle = (() => {
    if (editor.isActive("heading", { level: 1 })) return "heading1";
    else if (editor.isActive("heading", { level: 2 })) return "heading2";
    else if (editor.isActive("heading", { level: 3 })) return "heading3";
    else if (editor.isActive("heading", { level: 4 })) return "heading4";
    else if (editor.isActive("heading", { level: 5 })) return "heading5";
    else if (editor.isActive("heading", { level: 6 })) return "heading6";
    else return "paragraph";
  })();

  const changeTextStyle = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "heading1") {
      editor.chain().focus().setHeading({ level: 1 }).run();
    } else if (value === "heading2") {
      editor.chain().focus().setHeading({ level: 2 }).run();
    } else if (value === "heading3") {
      editor.chain().focus().setHeading({ level: 3 }).run();
    } else if (value === "heading4") {
      editor.chain().focus().setHeading({ level: 4 }).run();
    } else if (value === "heading5") {
      editor.chain().focus().setHeading({ level: 5 }).run();
    } else if (value === "heading6") {
      editor.chain().focus().setHeading({ level: 6 }).run();
    }
  };

  return (
    <div className="flex gap-1">
      <Select onValueChange={changeTextStyle} value={activeTextStyle}>
        <SelectTrigger className="flex gap-1 focus:outline-none">
          <div>
            <TextSizeIcon className="size-4" />
          </div>

          <div className="text-nowrap">
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="heading6">Heading 6</SelectItem>
            <SelectItem value="heading5">Heading 5</SelectItem>
            <SelectItem value="heading4">Heading 4</SelectItem>
            <SelectItem value="heading3">Heading 3</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
            <SelectItem
              value="heading1"
              onSelect={() => {
                console.log("S-A RULAT1");
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                console.log("S-A RULAT");
              }}
            >
              Heading 1
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const TextAlignment = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const activeAlignment = (() => {
    if (editor.isActive({ textAlign: "left" })) return "left";
    else if (editor.isActive({ textAlign: "center" })) return "center";
    else if (editor.isActive({ textAlign: "right" })) return "right";
    else if (editor.isActive({ textAlign: "justify" })) return "justify";
    else return "left";
  })();

  const changeAlignment = (value: string) => {
    if (value === "left") {
      editor.chain().focus().setTextAlign("left").run();
    } else if (value === "center") {
      editor.chain().focus().setTextAlign("center").run();
    } else if (value === "right") {
      editor.chain().focus().setTextAlign("right").run();
    } else if (value === "justify") {
      editor.chain().focus().setTextAlign("justify").run();
    }
  };

  return (
    <div className="flex gap-1">
      <ToggleGroup
        type="single"
        onValueChange={changeAlignment}
        value={activeAlignment}
      >
        <ToggleGroupItem value="left">
          <Tooltip>
            <TooltipTrigger asChild>
              <AlignLeftIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Align Left</TooltipContent>
          </Tooltip>
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <Tooltip>
            <TooltipTrigger asChild>
              <AlignCenterIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Align Center</TooltipContent>
          </Tooltip>
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <Tooltip>
            <TooltipTrigger asChild>
              <AlignRightIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Align Right</TooltipContent>
          </Tooltip>
        </ToggleGroupItem>
        <ToggleGroupItem value="justify">
          <Tooltip>
            <TooltipTrigger asChild>
              <AlignJustifyIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Justify</TooltipContent>
          </Tooltip>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

const HideEditorButton = ({
  editing,
  setEditing,
}: {
  editing: boolean;
  setEditing: any;
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const toggleEditing = () => {
    setEditing((prevEditing: boolean) => {
      if (prevEditing) {
        editor.setOptions({ editable: false });
      } else {
        editor.setOptions({ editable: true });
      }
      return !prevEditing;
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={toggleEditing}>
          {editing ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {editing ? "Hide Editor" : "Show Editor"}
      </TooltipContent>
    </Tooltip>
  );
};

const RichTextEditor = () => {
  const [editing, setEditing] = useState<boolean>(true);

  return (
    <EditorProvider
      editorProps={{
        attributes: {
          class: "nodrag nowheel cursor-default rich-text focus:outline-none",
        },
      }}
      editable={editing}
      extensions={extensions}
      // content={""}
      slotAfter={
        <Card className="fixed -bottom-14 left-0 flex gap-2 p-1">
          <HideEditorButton editing={editing} setEditing={setEditing} />
          {editing && (
            <>
              <MarkupGroup />
              <div className="min-h-full w-[1px] bg-slate-300 dark:bg-slate-600" />
              <TextSize />
              <TextAlignment />
            </>
          )}
        </Card>
      }
    >
      <></>
    </EditorProvider>
  );
};

export default RichTextEditor;
