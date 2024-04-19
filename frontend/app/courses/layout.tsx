import CoursesDesktopAddition from "@/modules/courses/pages/courses-desktop-addition";
import CoursesLayout from "@/modules/courses/pages/courses-layout";
import CoursesMobileAddition from "@/modules/courses/pages/courses-mobile-addition";

import React from "react";

const Layout = ({
  leftSection,
  rightSection,
  middleSection,
}: {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
  middleSection: React.ReactNode;
}) => {
  return (
    <CoursesLayout
      desktopAddition={
        <CoursesDesktopAddition
          leftSection={leftSection}
          middleSection={middleSection}
          rightSection={rightSection}
        />
      }
      mobileAddition={
        <CoursesMobileAddition
          leftSide={leftSection}
          middleSection={middleSection}
          rightSide={rightSection}
        />
      }
    />
  );
};

export default Layout;
