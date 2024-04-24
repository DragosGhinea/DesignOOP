"use client";

import React, { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";
import CourseJSONProvider from "../context/course-json-provider";
import MiddleSectionResponsive from "./middle-section-responsive";
import LeftSectionResponsive from "./left-section-responsive";
import RightSectionResponsive from "./right-section-responsive";
import GraphicJSONProvider from "../context/graphic-json-provider";

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
        <GraphicJSONProvider>
          <div className="flex size-full overflow-hidden">
            <LeftSectionResponsive>{leftSection}</LeftSectionResponsive>
            <MiddleSectionResponsive>{middleSection}</MiddleSectionResponsive>
            <RightSectionResponsive>{rightSection}</RightSectionResponsive>
          </div>
        </GraphicJSONProvider>
      </CourseJSONProvider>
    </main>
  );
};

export default CoursesLayout;
