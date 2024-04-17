import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative size-full bg-light-850 dark:bg-dark-300">
      <Navbar variant="main" />
      {children}
    </main>
  );
};

export default Layout;
