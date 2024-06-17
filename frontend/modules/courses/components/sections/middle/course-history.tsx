"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  GraduationCapIcon,
  BookOpenIcon,
  NotebookTextIcon,
  CalendarClockIcon,
  WindIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { CourseHistoryItem } from "./course-view-history";
import { useReadLocalStorage } from "usehooks-ts";
import { Badge } from "@/components/ui/badge";

const CourseHistoryElement = ({ element }: { element: CourseHistoryItem }) => {
  const router = useRouter();
  const date = new Date(element.lastAccessDate);
  const formattedDate = `${date.toLocaleDateString()} at ${date.getHours() % 12}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;

  const handleClick = () => {
    router.push(`/courses/${element.id}`);
  };

  return (
    <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl p-[2px]">
      <Card
        className="peer z-10 flex size-full cursor-pointer flex-col gap-3 p-5"
        onClick={handleClick}
      >
        <div className="grid h-[110px] grid-cols-6 gap-2">
          <div className="col-span-1 flex items-center justify-center">
            <GraduationCapIcon className="size-12" />
          </div>
          <div className="h4-typography col-span-5 font-bold">
            {element.title}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <BookOpenIcon className="size-6" />
          </div>
          <div className="h6-typography col-span-5  text-muted-foreground">
            {element.subtitle}
          </div>
        </div>

        <Separator className="mb-3 mt-4 flex h-[2px] items-center justify-center">
          <div className="inline rounded-full bg-muted p-2">
            <NotebookTextIcon className="size-6" />
          </div>
        </Separator>

        <ScrollArea className="">
          <div className="max-h-[75px]">{element.description}</div>
        </ScrollArea>

        <Separator className="my-2 h-[2px]" />

        <ScrollArea className="max-h-24">
          <div className="flex flex-wrap items-center gap-1">
            {element.tags.map((tag: string) => (
              <Badge key={tag} className="rounded-[5px] dark:bg-light-700">
                {tag}
              </Badge>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-1 flex items-center justify-end gap-2">
          <CalendarClockIcon />
          <Tooltip>
            <TooltipTrigger className="font-bold">
              {formattedDate}
            </TooltipTrigger>
            <TooltipContent className="w-52">
              Latest access date.
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
      <div className="absolute inset-0 left-[-25%] top-[-25%] size-[150%] animate-border-spin rounded-sm bg-[conic-gradient(#0ea5e9_0deg,#0ea5e9_0deg,transparent_80deg)] opacity-0 transition-opacity peer-hover:opacity-100" />
    </div>
  );
};

const CourseHistory = () => {
  const history = useReadLocalStorage<CourseHistoryItem[]>(
    "courseViewHistory",
    {
      initializeWithValue: false,
    }
  );

  if (!history || history.length === 0) {
    return (
      <div className="flex size-full flex-col items-center p-10">
        <h1 className="h1-typography">Courses History</h1>
        <p className="h6-typography mt-3 font-semibold text-muted-foreground">
          The courses you have recently visited.
        </p>
        <div className="mt-10 flex w-full flex-1 flex-col items-center justify-center gap-5">
          <div className="inline-block rounded-full bg-light-700 p-10 dark:bg-dark-500">
            <WindIcon className="size-20" />
          </div>
          <h6 className="h6-typography">
            Nothing here. Start browsing courses to see them here.
          </h6>
        </div>
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col items-center p-10">
      <h1 className="h1-typography">Courses History</h1>
      <p className="h6-typography mt-3 font-semibold text-muted-foreground">
        The courses you have recently visited.
      </p>
      <ScrollArea className="size-full flex-1 p-3 [&>div>div]:size-full">
        <div className="grid size-full flex-1 grid-cols-[repeat(auto-fill,_400px)] flex-col items-stretch justify-center gap-5">
          {history.map((item) => (
            <CourseHistoryElement key={item.id} element={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CourseHistory;
