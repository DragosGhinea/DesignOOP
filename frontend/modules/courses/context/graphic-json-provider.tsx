import { useParams, usePathname } from "next/navigation";
import React, { createContext, useState, ReactNode, useEffect } from "react";

type GraphicJSONType = JSON | null;

export interface GraphicJSONContextType {
  initialGraphicJSON: GraphicJSONType;
  setInitialGraphicJSON: React.Dispatch<React.SetStateAction<GraphicJSONType>>;
  inEditGraphicJSON: GraphicJSONType;
  setInEditGraphicJSON: React.Dispatch<React.SetStateAction<GraphicJSONType>>;
}

export const GraphicJSONContext = createContext<
  GraphicJSONContextType | undefined
>(undefined);

const GraphicJSONProvider = ({ children }: { children: ReactNode }) => {
  const [initialGraphicJSON, setInitialGraphicJSON] =
    useState<GraphicJSONType>(null);
  const [inEditGraphicJSON, setInEditGraphicJSON] =
    useState<GraphicJSONType>(null);

  const path = usePathname();
  const params = useParams();

  useEffect(() => {
    if (!path.startsWith("/courses/graphic/editor")) {
      setInitialGraphicJSON(null);
      setInEditGraphicJSON(null);
      return;
    }

    if (params.graphicArgs) {
    }

    // setInitialGraphicJSON(exampleGraphicJSON);
    // setInEditGraphicJSON(exampleGraphicJSON);

    // ignoring initialGraphicJSON
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, params, setInEditGraphicJSON, setInitialGraphicJSON]);

  return (
    <GraphicJSONContext.Provider
      value={{
        initialGraphicJSON,
        setInitialGraphicJSON,
        inEditGraphicJSON,
        setInEditGraphicJSON,
      }}
    >
      {children}
    </GraphicJSONContext.Provider>
  );
};

export default GraphicJSONProvider;
