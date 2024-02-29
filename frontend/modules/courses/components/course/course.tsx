import { ErrorBoundary } from "react-error-boundary";
import DynamicCourseComponent from "./dynamic-course-component";

export type CourseType = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  components?: any[];
};

const Course = ({ jsonData }: { jsonData: CourseType }) => {
  return (
    <div>
      Course
      <h1>{jsonData.title}</h1>
      <h2>{jsonData.subtitle}</h2>
      <p>{jsonData.description}</p>
      <ul>{jsonData.tags?.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
      {jsonData?.components?.map((component: any, index: number) => {
        return (
          <ErrorBoundary
            key={JSON.stringify({ ...component, children: undefined, index })}
            fallback={<h1>There is an error.</h1>}
          >
            <DynamicCourseComponent jsonData={component} />
          </ErrorBoundary>
        );
      })}
    </div>
  );
};

export default Course;
