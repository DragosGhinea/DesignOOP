import React from "react";
import GraphicStateEditor from "./graphic-state-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";

const GraphicEditor = () => {
  return (
    <div className="flex size-full flex-col">
      <Tabs defaultValue="1" className="flex size-full flex-col gap-1">
        <TabsList>
          <TabsTrigger value="1">1</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <div className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm ring-offset-background transition-all hover:bg-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:hover:bg-green-600">
            <PlusIcon size={16} className="mr-1" />
            Add state
          </div>
        </TabsList>
        <TabsContent value="1" className="size-full">
          <GraphicStateEditor />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default GraphicEditor;
