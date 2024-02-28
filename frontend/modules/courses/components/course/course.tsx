import DynamicCourseComponent from "./dynamic-course-component";

const Course = ({
  jsonData,
}: {
  jsonData: {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    components?: any[];
  };
}) => {
  return (
    <div>
      Course
      <h1>{jsonData.title}</h1>
      <h2>{jsonData.subtitle}</h2>
      <p>{jsonData.description}</p>
      <ul>
        {jsonData.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      {jsonData?.components?.map((component: any, index: number) => {
        return <DynamicCourseComponent key={index} jsonData={component} />;
      })}
    </div>
  );
};

export default Course;
