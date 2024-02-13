import { cookies } from "next/headers";
import CoursesLayoutClient from "./courses-layout-client";
import { ReactNode } from "react";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const layout = cookies().get("react-resizable-panels:courses-layout");

  return (
    <CoursesLayoutClient
      defaultLayout={layout ? JSON.parse(layout.value) : undefined}
    >
      {children}
    </CoursesLayoutClient>
  );
}
