import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";
import React, { useState } from "react";
import useUnsavedChangesProfile from "../../hooks/use-unsaved-changes-profile";

const EditImageModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [urlToNewImage, setUrlToNewImage] = useState("");
  const { setChanges } = useUnsavedChangesProfile();

  const handlePreviewChange = () => {
    setChanges((prev) => ({
      ...prev,
      avatarUrl: `link:${urlToNewImage}`,
    }));
    close();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(opening) => {
        if (!opening) {
          close();
        }
      }}
    >
      <DialogContent className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <DialogTitle>Change Image</DialogTitle>
          <DialogDescription>
            Currently you can only change your profile image by providing a link
            to one.
          </DialogDescription>
        </div>

        <div className="flex items-center gap-3">
          <LinkIcon />
          <Input
            defaultValue={urlToNewImage}
            onChange={(e) => setUrlToNewImage(e.target.value)}
            placeholder="Profile Image URL"
            required
          />
        </div>

        <DialogFooter>
          <Button
            disabled={/^(http|https):\/\/[^ "]+$/.test(urlToNewImage) === false}
            onClick={handlePreviewChange}
          >
            Preview Change
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditImageModal;
