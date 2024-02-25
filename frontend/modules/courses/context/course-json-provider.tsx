import React, { createContext, useState, ReactNode } from "react";

type CourseJSONType = JSON;

export interface CourseJSONContextType {
  courseJSON: CourseJSONType;
  setCourseJSON: React.Dispatch<React.SetStateAction<CourseJSONType>>;
}

export const CourseJSONContext = createContext<
  CourseJSONContextType | undefined
>(undefined);

interface CourseJSONProviderProps {
  children: ReactNode;
  courseJson: CourseJSONType;
}

const CourseJSONProvider = ({
  children,
  courseJson,
}: CourseJSONProviderProps) => {
  const [courseJSON, setCourseJSON] = useState<CourseJSONType>(courseJson);

  return (
    <CourseJSONContext.Provider value={{ courseJSON, setCourseJSON }}>
      {children}
    </CourseJSONContext.Provider>
  );
};

export default CourseJSONProvider;
