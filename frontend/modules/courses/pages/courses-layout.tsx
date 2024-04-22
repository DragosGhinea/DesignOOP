"use client";

import React, { ReactNode} from "react";
import Navbar from "@/components/navbar/navbar";
import CourseJSONProvider from "../context/course-json-provider";
import { ReactFlowProvider } from "reactflow";
import MiddleSectionResponsive from "./middle-section-responsive";
import LeftSectionResponsive from "./left-section-responsive";
import RightSectionResponsive from "./right-section-responsive";

const CoursesLayout = ({
  leftSection,
  middleSection,
  rightSection,
}: {
  leftSection: ReactNode;
  middleSection: ReactNode;
  rightSection: ReactNode;
}) => {

  return (
    <main className="relative flex size-full flex-col bg-light-850 dark:bg-dark-300">
      <Navbar />
      <CourseJSONProvider>
        <ReactFlowProvider>
          <div className="flex size-full overflow-hidden">
            <LeftSectionResponsive>{leftSection}</LeftSectionResponsive>
            <MiddleSectionResponsive>{middleSection}</MiddleSectionResponsive>
            <RightSectionResponsive>{rightSection}</RightSectionResponsive>
          </div>
        </ReactFlowProvider>
      </CourseJSONProvider>
    </main>
  );
};

export default CoursesLayout;
