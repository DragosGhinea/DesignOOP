import React, { useState } from "react";
import { ProfileInfo } from "../../types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditIcon, ImageIcon, ImagePlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import LinkedProviders from "./linked-providers";
import { Separator } from "@/components/ui/separator";
import EditImageModal from "./edit-image-modal";
import EditUsernameModal from "./edit-username-modal";
import useUnsavedChangesProfile from "../../hooks/use-unsaved-changes-profile";
import { rawAvatarToProfileImgUrl } from "../../utils/profile-utils";

const ProfileCard = ({
  profile,
  className,
  canEdit = true,
}: {
  profile: ProfileInfo;
  className?: string;
  canEdit?: boolean;
}) => {
  const { changes } = useUnsavedChangesProfile();
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);
  const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);

  const handleEditImage = () => {
    if (!canEdit) return;

    setIsEditImageModalOpen(true);
  };

  const handleEditUsername = () => {
    if (!canEdit) return;

    setIsEditUsernameModalOpen(true);
  };

  return (
    <>
      {canEdit && (
        <>
          <EditImageModal
            isOpen={isEditImageModalOpen}
            close={() => {
              setIsEditImageModalOpen(false);
            }}
          />
          <EditUsernameModal
            isOpen={isEditUsernameModalOpen}
            close={() => {
              setIsEditUsernameModalOpen(false);
            }}
          />
        </>
      )}
      <Card
        className={cn(
          "flex flex-col items-center justify-center gap-5 p-10",
          className
        )}
      >
        <Avatar
          className={cn(
            "relative size-[50%]",
            canEdit && "hover:cursor-pointer"
          )}
          onClick={handleEditImage}
        >
          <AvatarImage
            src={
              rawAvatarToProfileImgUrl(changes?.profileImgUrl) ||
              rawAvatarToProfileImgUrl(profile?.avatarUrl)
            }
            alt="ProfileImg"
            draggable={false}
            className="peer"
          />
          <AvatarFallback className={cn("peer", canEdit && "hover:opacity-0")}>
            <ImageIcon className="size-[40%] opacity-20" />
          </AvatarFallback>
          {canEdit && (
            <div className="pointer-events-none absolute flex size-full items-center justify-center rounded-full bg-black opacity-0 transition-[opacity] peer-hover:opacity-60">
              <ImagePlusIcon className="size-16 text-white" />
            </div>
          )}
        </Avatar>

        <h3 className="h3-typography flex">
          {changes?.username || profile.username}{" "}
          {canEdit && (
            <EditIcon
              className="m-2 cursor-pointer"
              onClick={handleEditUsername}
            />
          )}
        </h3>
        <div>
          <h6 className="h6-typography">{profile.email}</h6>
        </div>
        <div>
          {profile.roles.map((role) => (
            <Badge key={role} className="cursor-default">
              {role}
            </Badge>
          ))}
        </div>
        {profile.linkedProviders && (
          <>
            <Separator />
            <LinkedProviders linkedProviders={profile.linkedProviders} />
          </>
        )}
      </Card>
    </>
  );
};

export default ProfileCard;
