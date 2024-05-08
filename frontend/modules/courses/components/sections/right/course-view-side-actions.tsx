"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  BookXIcon,
  ExternalLinkIcon,
  NotebookPenIcon,
  SettingsIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CourseType } from "../../course/course";
import { useRouter } from "next/navigation";
import { deleteCourse } from "@/modules/courses/utils/course-crud";
import LoadingSpinner from "@/components/loading/loading-spinner";

const DeleteCourseButton = ({
  courseName,
  courseId,
}: {
  courseName: string;
  courseId: string;
}) => {
  const { data: user } = useSession();
  const [courseNameInput, setCourseNameInput] = useState<string>("");
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="destructive">
          <BookXIcon /> Delete Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="h4-typography font-bold">
          Delete Course
        </DialogTitle>
        <DialogDescription>
          Retype the course name to confirm deletion: <b>{courseName}</b>
        </DialogDescription>
        <Input
          onChange={(event) => setCourseNameInput(event.target.value)}
          type="text"
          placeholder="Course Name"
        />
        <DialogClose asChild>
          <Button
            variant="destructive"
            onClick={async () =>
              deleteCourse(
                router,
                user?.user.backend.accessToken || "",
                courseId
              )
            }
            disabled={courseNameInput !== courseName}
          >
            Delete Course
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const handleOpenInEditor = (router: any, courseId: string) => {
  router.push(`/courses/editor/${courseId}`);
};

const AdminActions = ({ courseJson }: { courseJson: CourseType }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start justify-center gap-5 p-7">
      <div className="h4-typography relative ml-1 text-ellipsis text-nowrap pl-10 font-bold">
        <div className="absolute -top-1 left-[-26px] rounded-full bg-muted p-2">
          <SettingsIcon className="size-10" />
        </div>
        Admin Options
      </div>
      <Button
        className="flex gap-2"
        onClick={() => handleOpenInEditor(router, courseJson.id as string)}
      >
        <ExternalLinkIcon /> Open in Course Editor
      </Button>
      <DeleteCourseButton
        courseName={courseJson.title}
        courseId={courseJson.id as string}
      />
    </div>
  );
};

const AnyUserActions = ({ courseJson }: { courseJson: CourseType }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start justify-center gap-5 p-7">
      <div className="h4-typography relative ml-1 text-ellipsis text-nowrap pl-10 font-bold">
        <div className="absolute -top-1 left-[-26px] rounded-full bg-muted p-2">
          <NotebookPenIcon className="size-10" />
        </div>
        Creator Options
      </div>
      <Button
        className="flex gap-2"
        onClick={() => handleOpenInEditor(router, courseJson.id as string)}
      >
        <ExternalLinkIcon /> Open in Course Editor
      </Button>
    </div>
  );
};

const CourseViewSideActions = ({ courseJson }: { courseJson: CourseType }) => {
  const { data: user, status } = useSession();
  const isAdmin =
    status === "authenticated" &&
    user?.user.authorities.includes("ROLE_COURSE_MANAGER");

  if (status === "loading") return <LoadingSpinner />;

  if (isAdmin) return <AdminActions courseJson={courseJson} />;

  return <AnyUserActions courseJson={courseJson} />;
};

export default CourseViewSideActions;
