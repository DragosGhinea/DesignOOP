"use client";

import { useEffect } from "react";
import { CourseType } from "../../course/course";
import { useLocalStorage } from "usehooks-ts";

export interface CourseHistoryItem {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  lastAccessDate: Date;
}

const CourseViewHistory = ({ courseJson }: { courseJson: CourseType }) => {
  const [, setHistory] = useLocalStorage<CourseHistoryItem[]>(
    "courseViewHistory",
    []
  );

  useEffect(() => {
    if (!courseJson) return;

    const newHistoryItem = {
      id: courseJson.id,
      title: courseJson.title,
      subtitle: courseJson.subtitle,
      tags: courseJson.tags,
      description: courseJson.description,
      lastAccessDate: new Date(),
    } as CourseHistoryItem;

    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter(
        (item) => item.id !== courseJson.id
      );
      newHistory.splice(0, 0, newHistoryItem);

      return newHistory;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseJson, setHistory]);

  return null;
};

export default CourseViewHistory;
