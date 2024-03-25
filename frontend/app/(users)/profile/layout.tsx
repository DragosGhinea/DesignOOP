import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex size-full flex-col bg-light-850 dark:bg-dark-300">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
