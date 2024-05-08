"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgePlusIcon, SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import useCourseJSON from "../../hooks/use-course-json";
import { CourseType } from "../course/course";
import _ from "lodash";
import { createCourse, saveCourse } from "../../utils/course-crud";

const ActionsBar = () => {
  const { data, status } = useSession();
  const { courseJson } = useCourseJSON();
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseArgs ? params.courseArgs[0] : null;

  if (status === "loading") return null;

  if (courseId === null && courseJson.inEditCourseJson !== null) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="success" className="flex gap-2 rounded-none p-6">
            <BadgePlusIcon className="size-8" /> Create Course
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>
            Confirm that you want to create a new course.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              variant="success"
              onClick={() => createCourse(router, data?.user.backend.accessToken || "", courseJson.inEditCourseJson)}
            >
              Create
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  if (!_.isEqual(courseJson.inEditCourseJson, courseJson.initialCourseJson)) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="success" className="flex gap-2 rounded-none p-6">
            <SaveIcon className="size-8" /> Save Changes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Save Changes</DialogTitle>
          <DialogDescription>
            Confirm that you want to save the changes made to this course.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              variant="success"
              className="flex gap-2 rounded-none p-6"
              onClick={() =>
                saveCourse(router, data?.user.backend.accessToken || "", {
                  ...(courseJson.inEditCourseJson as CourseType),
                  id: courseId as string,
                })
              }
            >
              <SaveIcon className="size-8" />
              Save
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};

export default ActionsBar;
