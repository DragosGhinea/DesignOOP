import { Button } from "@/components/ui/button";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { DownloadIcon } from "lucide-react";
import { RefObject, forwardRef, useCallback } from "react";
import { triggerDownload } from "../../utils/json-download";
import { useBoolean } from "usehooks-ts";

const DownloadButton = forwardRef<
  HTMLButtonElement,
  { codeRef: RefObject<ReactCodeMirrorRef> }
>(({ codeRef, ...props }, ref) => {
  const { value: isInCooldown, setFalse, setTrue } = useBoolean(false);

  const onClick = useCallback(() => {
    if (!codeRef.current) return;
    if (!codeRef.current.view) return;

    triggerDownload(codeRef.current.view.state.doc.toString(), "course.json");
    setTrue();
    setTimeout(() => {
      setFalse();
    }, 1000);
  }, [codeRef, setFalse, setTrue]);

  return (
    <Button
      {...props}
      disabled={isInCooldown}
      ref={ref}
      variant="outline"
      size="icon"
      className="pointer-events-auto border-2 border-black dark:border-light-700"
      onClick={onClick}
    >
      <DownloadIcon className="size-5" />
    </Button>
  );
});
DownloadButton.displayName = "DownloadButton";

export default DownloadButton;
