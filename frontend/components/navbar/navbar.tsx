"use client";

import React from "react";
import { useMediaQuery } from "usehooks-ts";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

const Navbar = ({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: string;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  return isDesktop ? (
    <NavbarDesktop className={className} variant={variant} />
  ) : (
    <NavbarMobile className={className} variant={variant} />
  );
};

export default Navbar;
