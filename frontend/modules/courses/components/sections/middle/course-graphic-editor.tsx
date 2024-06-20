"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import GraphicEditor from "../../graphic/graphic-editor";
import { useDebounceCallback, useSessionStorage } from "usehooks-ts";
import { convertBase64ToString } from "@/utils/base64";
import JSONCrush from "jsoncrush";
import { toast } from "sonner";
import { ReactFlowJsonObject } from "reactflow";

const CourseGraphicEditor = () => {
  const workerRef = useRef<Worker>()
  const [graphicData, setGraphicData] = useSessionStorage<string | undefined>(
    "course-graphic-editor",
    undefined,
    {
      deserializer(value) {
        return value;
      },
    }
  );

  useEffect(() => {
    // worker receives data and returns the crushed data in base64
    workerRef.current = new Worker(new URL("/public/workers/graphic-session-worker.js", import.meta.url));

    workerRef.current.onmessage = (event) => {
      setGraphicData(event.data);
    };

    return () => {
      if (workerRef.current)
        workerRef.current.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (data: ReactFlowJsonObject<any, any>) => {
    // const stringifiedData = JSONCrush.crush(JSON.stringify(data));
    // setGraphicData(convertStringToBase64(stringifiedData));
    if (workerRef.current) {
      workerRef.current.postMessage(data);
    }
  };

  const debouncedOnChange = useDebounceCallback(onChange, 1000);

  const jsonData = useMemo(() => {
    if (!graphicData) {
      return undefined;
    }

    try {
      return JSON.parse(JSONCrush.uncrush(convertBase64ToString(graphicData)));
    } catch (e) {
      toast.error("Invalid graphic data");
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex size-full flex-col pt-5">
      <div className="px-3">
        <h3 className="h3-typography text-center font-bold">Graphic Editor</h3>
        <h6 className="h6-typography text-center text-muted-foreground">
          Edit and preview graphics. You can also save them in compressed
          format.
        </h6>
      </div>
      <Separator className="mt-3" />

      <GraphicEditor dataJson={jsonData} onChange={debouncedOnChange} />
    </div>
  );
};

export default CourseGraphicEditor;
