import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

const EditCodeButton = ({ onClick }: { onClick: any }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto"
          onClick={onClick}
        >
          <EditIcon className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-bold">Edit Code Box</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EditCodeButton;
