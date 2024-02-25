import { useContext } from 'react';
import { CourseJSONContext, CourseJSONContextType } from '@/modules/courses/context/course-json-provider';

const useCourseJSON = (): CourseJSONContextType => {
  const context = useContext(CourseJSONContext);
  if (!context) {
    throw new Error('useCourseJSON must be used within a CourseJSONProvider');
  }
  return context;
};

export default useCourseJSON;
