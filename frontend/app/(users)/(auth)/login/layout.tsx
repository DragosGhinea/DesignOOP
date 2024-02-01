import LoginNavbar from "@/modules/users/components/navbar/LoginNavbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative size-full bg-light-850 dark:bg-dark-300">
      <LoginNavbar />
      {children}
    </main>
  );
};

export default Layout;