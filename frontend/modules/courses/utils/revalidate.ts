"use server";

import { revalidateTag } from "next/cache";

export const triggerRevalidationOfCourse = (courseId: string) => {
  revalidateTag(`course-${courseId}`);
};
