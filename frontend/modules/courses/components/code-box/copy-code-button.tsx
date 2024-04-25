import { Button } from "@/components/ui/button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { useBoolean } from "usehooks-ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const CopyCodeButton = ({ code }: { code: string }) => {
  const { value: justCopiedToClipboard, setFalse, setTrue } = useBoolean(false);
  const onClick = () => {
    navigator.clipboard.writeText(code);
    setTrue();

    setTimeout(() => {
      setFalse();
    }, 1000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={(event) => event.preventDefault()}>
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto"
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
    </TooltipProvider>
  );
};

export default CopyCodeButton;
