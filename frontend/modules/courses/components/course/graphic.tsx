"use client";

import React, { useMemo } from "react";
import { convertBase64ToString } from "@/utils/base64";
import JSONCrush from "jsoncrush";
import { ReactFlowJsonObject, ReactFlowProvider } from "reactflow";
import GraphicStateDisplay from "../graphic/graphic-state-display";

const Graphic = ({ graphic, id }: { graphic: string; id?: string }) => {
  const graphicJson: ReactFlowJsonObject<any, any> | undefined = useMemo(() => {
    try {
      const crushed = convertBase64ToString(
        graphic.startsWith(".") ? graphic.substring(1) : graphic
      );
      const uncrushed = JSONCrush.uncrush(crushed);
      return JSON.parse(uncrushed);
    } catch (e) {
      return undefined;
    }
  }, [graphic]);

  if (!graphicJson) {
    return <div>Invalid graphic</div>;
  }

  return (
    <div className="h-[50vh] min-h-20 w-full min-w-20" id={id}>
      <ReactFlowProvider>
        <GraphicStateDisplay restoreDataJson={graphicJson} />
      </ReactFlowProvider>
    </div>
  );
};

export default Graphic;
