import { RefObject, forwardRef, useState } from "react";
import {
  ensureSyntaxTree,
  foldable,
  foldEffect,
  unfoldEffect,
} from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { SyntaxNodeRef } from "@lezer/common";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { FoldVerticalIcon, UnfoldVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const foldAllTree = (view: EditorView) => {
  const effects: any[] = [];

  ensureSyntaxTree(view.state, view.state.doc.length, 5000)?.iterate({
    enter: (node: SyntaxNodeRef) => {
      const foldRange = foldable(view.state, node.from, node.to);
      if (foldRange) {
        effects.push(foldEffect.of({ from: foldRange.from, to: foldRange.to }));
      }
    },
  });

  if (effects.length) view.dispatch({ effects });
};

const unfoldAllTree = (view: EditorView) => {
  const effects: any[] = [];

  ensureSyntaxTree(view.state, view.state.doc.length, 5000)?.iterate({
    enter: (node: SyntaxNodeRef) => {
      const foldRange = foldable(view.state, node.from, node.to);
      if (foldRange) {
        effects.push(
          unfoldEffect.of({ from: foldRange.from, to: foldRange.to })
        );
      }
    },
  });

  if (effects.length) view.dispatch({ effects });
};

const CollapseAllButton = forwardRef<
  HTMLButtonElement,
  { codeRef: RefObject<ReactCodeMirrorRef> }
>(({ codeRef, ...props }, ref) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <Button
        {...props}
        ref={ref}
        variant="outline"
        size="icon"
        className="pointer-events-auto border-2 border-black dark:border-light-700"
        onClick={() => {
          const view = codeRef.current?.view;
          if (!view) return;

          unfoldAllTree(view);
          setCollapsed(false);
        }}
      >
        <UnfoldVerticalIcon className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      {...props}
      ref={ref}
      variant="outline"
      size="icon"
      className="pointer-events-auto border-2 border-black dark:border-light-700"
      onClick={() => {
        const view = codeRef.current?.view;
        if (!view) return;

        foldAllTree(view);
        setCollapsed(true);
      }}
    >
      <FoldVerticalIcon className="size-5" />
    </Button>
  );
});
CollapseAllButton.displayName = "CollapseAllButton";

export default CollapseAllButton;
