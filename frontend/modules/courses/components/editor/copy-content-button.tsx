import { Button } from "@/components/ui/button";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { RefObject } from "react";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { useBoolean } from "usehooks-ts";

const CopyContentButton = ({
  codeRef,
}: {
  codeRef: RefObject<ReactCodeMirrorRef>;
}) => {
  const { value: justCopiedToClipboard, setFalse, setTrue } = useBoolean(false);
  const onClick = () => {
    const view = codeRef.current?.view;
    if (justCopiedToClipboard) return;

    if (!view) return;

    const text = view.state.doc.toString();
    navigator.clipboard.writeText(text);
    setTrue();

    setTimeout(() => {
      setFalse();
    }, 1000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild onClick={(event) => event.preventDefault()}>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto border-2 border-black dark:border-light-700"
          onClick={onClick}
        >
          {justCopiedToClipboard ? (
            <CopyCheckIcon className="size-5" />
          ) : (
            <CopyIcon className="size-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        onPointerDownOutside={(event) => {
          event.preventDefault();
        }}
      >
        <p className="font-bold">
          {justCopiedToClipboard ? "Copied!" : "Copy to clipboard"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyContentButton;
