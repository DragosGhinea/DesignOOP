import Course from "@/modules/courses/components/course/course";
import { cookies } from "next/headers";
import React from "react";

const Test = () => {
  const cookie = cookies().get("tokenBackend");
  return (
    cookie.value
  );
};

export default Test;
