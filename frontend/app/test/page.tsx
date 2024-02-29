import Course from "@/modules/courses/components/course/course";
import React from "react";

const Test = () => {
  return (
    <Course
      jsonData={{
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        tags: ["tag1", "tag2"],
        components: [
          {
            componentType: "container",
            children: [
              {
                componentType: "paragraph",
                title: "Title1",
                text: "Text",
              },
              {
                componentType: "paragraph2",
                title: "Title2",
                text: "Text",
              },
            ],
          },
          {
            componentType: "paragraph",
            title: "Title3",
            text: "Text",
          },
        ],
      }}
    />
  );
};

export default Test;
