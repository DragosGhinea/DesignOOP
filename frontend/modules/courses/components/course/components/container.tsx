import React, { ReactNode } from "react";

const Container = ({ children, id }: { children: ReactNode; id?: string }) => {
  return (
    <div className="flex" id={id}>
      {children}
    </div>
  );
};

export default Container;
