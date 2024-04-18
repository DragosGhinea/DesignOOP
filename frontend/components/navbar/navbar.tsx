import React from "react";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";
import ConditionalRenderMediaQuery from "@/context/conditional-render-media-query";

const Navbar = ({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: string;
}) => {
  return (
    <ConditionalRenderMediaQuery
      mediaQuery="(min-width: 768px)"
      trueComponent={<NavbarDesktop className={className} variant={variant} />}
      falseComponent={<NavbarMobile className={className} variant={variant} />}
    />
  );
};

export default Navbar;
