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
import { cn } from "@/utils/common";
import { EditIcon, Layers3Icon, LinkIcon } from "lucide-react";
import DiscordIcon from "@/components/icons/discord-icon";
import { ScrollArea } from "@/components/ui/scroll-area";

const SuggestionEntry = ({
  name,
  description,
  link,
  className,
  icon = <LinkIcon className="size-8" />,
  blank = false,
}: {
  name: string;
  description: string;
  link: string;
  className?: string;
  icon?: React.ReactNode;
  blank?: boolean;
}) => {
  return (
    <Link
      href={link}
      target={blank ? "_blank" : undefined}
      className={cn(
        "w-full shadow-[rgba(0,0,0,0.1)_0px_4px_12px] dark:shadow-none dark:bg-dark-300 bg-light-850 p-5 rounded-md grid grid-cols-8 grid-rows-2 whitespace-nowrap hover:whitespace-normal max-h-[100px] hover:max-h-[500px] transition-all [&_div]:hover:border-blue-300 [&_div]:dark:hover:border-blue-800 duration-500",
        className
      )}
    >
      <p className="p-typography col-span-6 self-center overflow-hidden text-ellipsis text-muted-foreground">
        {description}
      </p>
      <h3 className="p-typography col-span-6 self-center overflow-hidden text-ellipsis font-bold">
        {name}
      </h3>
      <div className="col-span-2 col-start-7 row-span-2 row-start-1 flex items-center justify-center self-center justify-self-end rounded-xl border-2 bg-light-700 p-2 transition-[border] duration-700 dark:bg-dark-100">
        {icon}
      </div>
    </Link>
  );
};

const SuggestionsCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
        <CardDescription>Some actions suggested for you</CardDescription>
      </CardHeader>
      <ScrollArea className="mx-8 h-[72%] max-h-[63%] border-y-2 lg:max-h-[72%]">
        <CardContent className="flex flex-col items-center gap-3 p-4">
          <SuggestionEntry
            name="See courses"
            description="See all courses and search for specific ones."
            link="/courses"
            icon={<Layers3Icon className="size-8" />}
          />
          <SuggestionEntry
            name="Join Discord"
            description="Interact with the community."
            link="/discord"
            icon={<DiscordIcon className="size-8" />}
            blank
          />
          <SuggestionEntry
            name="Create Courses"
            description="Use our tools to create your own courses and graphics."
            link="/courses/editor"
            icon={<EditIcon className="size-8" />}
          />
        </CardContent>
      </ScrollArea>
      <CardFooter />
    </Card>
  );
};

export default SuggestionsCard;
