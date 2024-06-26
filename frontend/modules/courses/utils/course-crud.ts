import { toast } from "sonner";
import { CourseType } from "../components/course/course";
import { triggerRevalidationOfCourse } from "./revalidate";
import { getCoursesUrl } from "@/utils/backend-utils";

export const createCourse = async (
  router: any,
  accessToken: string,
  courseJson: CourseType | null
) => {
  if (!courseJson) {
    console.error("No course JSON to save");
    return false;
  }

  const res = await fetch(
    `${getCoursesUrl()}/v1/courses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(courseJson),
    }
  );

  if (!res.ok) {
    console.error("Failed to save course", res);
    return false;
  }

  const resJson = await res.json();

  triggerRevalidationOfCourse(resJson.id);
  router.push(`/courses/${resJson.id}`);
  toast.success("Course created successfully.", { duration: 5000 });
  return true;
};

export const saveCourse = async (
  router: any,
  accessToken: string,
  courseJson: CourseType | null
) => {
  if (!courseJson) {
    console.error("No course JSON to save");
    return false;
  }

  const res = await fetch(
    `${getCoursesUrl()}/v1/courses/${courseJson.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(courseJson),
    }
  );

  if (!res.ok) {
    console.error("Failed to save course", res);
    toast.error("Failed to save course.");
    return false;
  }

  triggerRevalidationOfCourse(courseJson.id as string);
  router.push(`/courses/${courseJson.id}`);
  toast.success("Course saved successfully.", { duration: 5000 });
  return true;
};

export const deleteCourse = (
  router: any,
  accessToken: string,
  courseId: string
) => {
  fetch(
    getCoursesUrl() + `/v1/courses/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    }
  )
    .then(async (res) => {
      if (res.status !== 200) {
        let jsonRes: any;
        try {
          jsonRes = await res.json();
        } catch (e) {
          toast.error("Response from server is not in JSON format.");
        }
        
        console.log("Failed to delete course. " + jsonRes);
        toast.error("Failed to delete course. " + jsonRes.message);
        return;
      }

      triggerRevalidationOfCourse(courseId);
      router.push("/courses");
      toast.success("Course deleted successfully.", { duration: 5000 });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Unexpected error occurred while deleting course.");
    });
};
