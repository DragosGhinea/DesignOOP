"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import YamlEditor from "../editor/yaml-editor";
import JSONEditor from "../editor/json-editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseJSONProvider from "../../context/course-json-provider";

const CourseEditor = () => {
  return (
    <div className="relative flex size-full flex-col gap-5 pt-5">
      <div className="px-3">
        <h3 className="h3-typography text-center font-bold">Course Editor</h3>
        <h6 className="h6-typography text-center text-muted-foreground">
          Internally courses are managed as JSONs but you can also edit them as
          YAMLs.
        </h6>
      </div>
      <Tabs
        defaultValue="yaml"
        className="relative flex grow-[1] flex-col overflow-y-auto"
      >
        <div className="mb-2 flex justify-center">
          <TabsList className="grid w-[50%] grid-cols-2 self-center">
            <TabsTrigger value="yaml">YAML</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="size-full pr-3">
          <CourseJSONProvider
            courseJson={JSON.parse(
              '{"default": "test", "property1": {"property2": {"something": "yay"}}}'
            )}
          >
            <TabsContent value="yaml">
              <YamlEditor />
            </TabsContent>
            <TabsContent value="json">
              <JSONEditor />
            </TabsContent>
          </CourseJSONProvider>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default CourseEditor;
