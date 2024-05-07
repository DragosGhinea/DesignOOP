import { ErrorBoundary } from "react-error-boundary";
import DynamicCourseComponent from "./dynamic-course-component";
import { Badge } from "@/components/ui/badge";

export type CourseType = {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  components?: any[];
};

const Course = ({ jsonData }: { jsonData: CourseType }) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="h1-typography font-bold leading-[3.5rem]">
          {jsonData.title}
        </h1>
        <h4 className="h4-typography leading-[2.5rem]">{jsonData.subtitle}</h4>
        <p className="mt-3">{jsonData.description}</p>
        <div className="mx-5 my-7 flex cursor-default flex-wrap gap-2">
          {jsonData.tags?.map((tag, index) => {
            return (
              <Badge
                className="h6-typography rounded-2xl px-3 py-1"
                key={index}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>

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
