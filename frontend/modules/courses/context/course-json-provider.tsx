import { useParams, usePathname } from "next/navigation";
import React, { createContext, useState, ReactNode, useEffect } from "react";

type CourseJSONType = JSON | null;

export interface CourseJSONContextType {
  initialCourseJSON: CourseJSONType;
  setInitialCourseJSON: React.Dispatch<React.SetStateAction<CourseJSONType>>;
  inEditCourseJSON: CourseJSONType;
  setInEditCourseJSON: React.Dispatch<React.SetStateAction<CourseJSONType>>;
}

export const CourseJSONContext = createContext<
  CourseJSONContextType | undefined
>(undefined);

interface CourseJSONProviderProps {
  children: ReactNode;
}

const exampleCourseJSON = JSON.parse(
  JSON.stringify({
    title: "Example Course",
    subtitle: "A placeholder JSON course",
    description:
      "The course description saying in a small paragraph what it will contain",
    tags: [
      "example",
      "course",
      "default",
      "learning experience",
      "json editor",
      "separate design from content",
    ],
    components: [
      {
        componentType: "container",
        children: [
          {
            componentType: "paragraph",
            title: "Starting",
            text: "This is an example json showing a bit of the format used to write courses",
          },
          {
            componentType: "paragraph",
            title: "Why this editor?",
            text: "Use this online editor since it can provide autocomplete functionality for components and properties. Also gives you a live preview window!",
          },
        ],
      },
      {
        componentType: "container",
        children: [
          {
            componentType: "paragraph",
            title: "No control over design?",
            text: "Indeed, the design is more or less controlled by the definition of components inside the source code of the application. It is our way of generalizing design over all the courses, so they maintain a consistent look.",
          },
        ],
      },
    ],
  })
) as JSON;

const CourseJSONProvider = ({ children }: CourseJSONProviderProps) => {
  const [initialCourseJSON, setInitialCourseJSON] =
    useState<CourseJSONType>(null);
  const [inEditCourseJSON, setInEditCourseJSON] =
    useState<CourseJSONType>(null);

  const path = usePathname();
  const params = useParams();

  useEffect(() => {
    if (!path.startsWith("/courses/editor")) {
      setInitialCourseJSON(null);
      setInEditCourseJSON(null);
      return;
    }

    if (params.courseArgs) {
      return;
    }

    setInitialCourseJSON(exampleCourseJSON);
    setInEditCourseJSON(exampleCourseJSON);

    // ignoring initialCourseJSON
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, params, setInEditCourseJSON, setInitialCourseJSON]);

  return (
    <CourseJSONContext.Provider
      value={{
        initialCourseJSON,
        setInitialCourseJSON,
        inEditCourseJSON,
        setInEditCourseJSON,
      }}
    >
      {children}
    </CourseJSONContext.Provider>
  );
};

export default CourseJSONProvider;
