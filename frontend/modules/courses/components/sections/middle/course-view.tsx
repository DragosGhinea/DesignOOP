import React from "react";
import Course, { CourseType } from "../../course/course";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookDashed, BugIcon } from "lucide-react";

const CourseView = async ({ params }: { params: { courseId: string } }) => {
  const jsonData = await fetch(
    `${process.env.NEXT_PUBLIC_COURSES_BACKEND_URL}/v1/courses/${params.courseId}`,
    { next: { revalidate: 3600, tags: [`course-${params.courseId}`] } }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error("FETCH ERROR FOR COURSE " + params.courseId, err);
      return err;
    });

  if ("error" in jsonData) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="rounded-full bg-muted p-10">
          {jsonData.status === 404 ? (
            <BookDashed className="size-20" />
          ) : (
            <BugIcon className="size-20" />
          )}
        </div>
        <h1 className="h1-typography font-bold">Error {jsonData.status}</h1>
        <p className="h5-typography">{jsonData.message}</p>
      </div>
    );
  }

  if (!("id" in jsonData)) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="rounded-full bg-muted p-10">
          {jsonData.status === 404 ? (
            <BookDashed className="size-20" />
          ) : (
            <BugIcon className="size-20" />
          )}
        </div>
        <h1 className="h1-typography font-bold">Unknown Error</h1>
        <p className="h5-typography">
          The error thrown does not respect the standard format.
        </p>
        <span className="text-muted-foreground">
          {JSON.stringify(jsonData)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex size-full flex-col">
      <ScrollArea className="size-full flex-1 px-2" id="course-scroll-wrapper">
        <div className="h-14" />
        <Course jsonData={jsonData as CourseType} />
      </ScrollArea>
    </div>
  );
};

export default CourseView;
