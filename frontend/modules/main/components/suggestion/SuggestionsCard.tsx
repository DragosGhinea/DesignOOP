import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KeyRoundIcon, Layers3Icon, LinkIcon } from "lucide-react";
import DiscordIcon from "@/components/icons/DiscordIcon";
import { ScrollArea } from "@/components/ui/scroll-area";

const SuggestionEntry = ({
  name,
  description,
  link,
  className,
  icon = <LinkIcon className="size-8" />,
}: {
  name: string;
  description: string;
  link: string;
  className?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        "w-full shadow-[rgba(0,0,0,0.1)_0px_4px_12px] dark:shadow-none dark:bg-dark-300 bg-light-850 p-5 rounded-md grid grid-cols-8 grid-rows-2 whitespace-nowrap hover:whitespace-normal",
        className
      )}
    >
      <p className="base-medium col-span-6 self-center overflow-hidden text-ellipsis text-muted-foreground">
        {description}
      </p>
      <h3 className="base-bold col-span-6 self-center overflow-hidden text-ellipsis">
        {name}
      </h3>
      <div className="col-span-2 col-start-7 row-span-2 row-start-1 flex items-center justify-center self-center justify-self-end rounded-xl bg-light-700 p-2 dark:bg-dark-100">
        {icon}
      </div>
    </Link>
  );
};

const SuggestionsCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("relative overflow-auto custom-scrollbar", className)}>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
        <CardDescription>Some actions suggested for you</CardDescription>
      </CardHeader>
      <ScrollArea className="mx-8 h-[72%] max-h-[72%] border-y-2">
        <CardContent className="flex flex-col items-center gap-3 p-4">
          <SuggestionEntry
            name="Login"
            description="You need an account if you want to track your activity and progress."
            link="/login"
            icon={<KeyRoundIcon className="size-8" />}
          />
          <SuggestionEntry
            name="See courses"
            description="See all articles and search for specific ones."
            link="/courses"
            icon={<Layers3Icon className="size-8" />}
          />
          <SuggestionEntry
            name="Join Discord"
            description="Interact with the community."
            link="/discord"
            icon={<DiscordIcon className="size-8" />}
          />
        </CardContent>
      </ScrollArea>
      <CardFooter />
    </Card>
  );
};

export default SuggestionsCard;
