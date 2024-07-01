import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";
import React, { useState } from "react";
import useUnsavedChangesProfile from "../../hooks/use-unsaved-changes-profile";

const EditUsernameModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [newUsername, setNewUsername] = useState("");
  const { setChanges } = useUnsavedChangesProfile();

  const handlePreviewChange = () => {
    setChanges((prev) => ({
      ...prev,
      username: newUsername,
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
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription>
            The username has to be alphanumeric and can contain underscores.
          </DialogDescription>
        </div>

        <div className="flex items-center gap-3">
          <UserIcon />
          <Input
            defaultValue={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <DialogFooter>
          <Button
            disabled={/^[a-zA-Z0-9_]{3,30}$/.test(newUsername) === false}
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

export default EditUsernameModal;
