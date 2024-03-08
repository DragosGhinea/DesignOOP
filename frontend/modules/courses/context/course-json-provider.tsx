import React, { createContext, useState, ReactNode } from "react";

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

const CourseJSONProvider = ({ children }: CourseJSONProviderProps) => {
  const [initialCourseJSON, setInitialCourseJSON] =
    useState<CourseJSONType>(null);
  const [inEditCourseJSON, setInEditCourseJSON] =
    useState<CourseJSONType>(null);

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
