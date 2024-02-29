import React, { createContext, useState, ReactNode } from "react";
import { useBoolean } from "usehooks-ts";

type CourseJSONType = JSON | null;

export interface CourseJSONContextType {
  courseJSON: CourseJSONType;
  setCourseJSON: React.Dispatch<React.SetStateAction<CourseJSONType>>;
  isEditorValid: boolean;
  markEditorValid: () => void;
  markEditorInvalid: () => void;
}

export const CourseJSONContext = createContext<
  CourseJSONContextType | undefined
>(undefined);

interface CourseJSONProviderProps {
  children: ReactNode;
}

const CourseJSONProvider = ({ children }: CourseJSONProviderProps) => {
  const [courseJSON, setCourseJSON] = useState<CourseJSONType>(null);
  const {
    value: isEditorValid,
    setTrue: markEditorValid,
    setFalse: markEditorInvalid,
  } = useBoolean(true);

  return (
    <CourseJSONContext.Provider
      value={{
        courseJSON,
        setCourseJSON,
        isEditorValid,
        markEditorValid,
        markEditorInvalid,
      }}
    >
      {children}
    </CourseJSONContext.Provider>
  );
};

export default CourseJSONProvider;
