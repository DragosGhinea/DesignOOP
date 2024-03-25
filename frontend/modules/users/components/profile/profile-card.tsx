import React from "react";
import { ProfileInfo } from "../../types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const ProfileCard = ({
  profile,
  className,
}: {
  profile: ProfileInfo;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center gap-5 p-10",
        className
      )}
    >
      <Avatar className="relative size-[50%]">
        <AvatarImage src={profile.avatar} alt="ProfileImg" draggable={false} />
        <AvatarFallback>
          <ImageIcon className="size-[40%] opacity-20" />
        </AvatarFallback>
      </Avatar>
      <h3 className="h3-typography">{profile.username}</h3>
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
    </Card>
  );
};

export default ProfileCard;
