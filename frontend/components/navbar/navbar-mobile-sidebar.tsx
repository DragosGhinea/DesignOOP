import React, { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

const NavbarMobileSidebar = ({
  isOpen,
  setOpen,
  content,
}: {
  isOpen: boolean;
  setOpen: any;
  content: ReactNode;
}) => {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(opened) => {
        if (!opened) setOpen(false);
      }}
    >
      <SheetContent>{content}</SheetContent>
    </Sheet>
  );
};

export default NavbarMobileSidebar;
