import React from "react";
import { Separator } from "@/components/ui/separator";
import GraphicEditor from "../../graphic/graphic-editor";

const CourseGraphicEditor = () => {
  return (
    <div className="relative flex size-full flex-col pt-5">
      <div className="px-3">
        <h3 className="h3-typography text-center font-bold">Graphic Editor</h3>
        <h6 className="h6-typography text-center text-muted-foreground">
          Edit and preview graphics. You can also save them in raw format.
        </h6>
      </div>
      <Separator className="mt-3" />

      <GraphicEditor />
    </div>
  );
};

export default CourseGraphicEditor;
