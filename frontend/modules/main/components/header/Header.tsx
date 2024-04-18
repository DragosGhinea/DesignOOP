import React from "react";
import HeaderCanvas from "./canvas/header-canvas";
import SuggestionsCard from "../suggestion/suggestions-card";
import { BadgeCheckIcon } from "lucide-react";
import HeaderCanvasMobile from "./canvas/header-canvas-mobile";
import ConditionalRenderMediaQuery from "@/context/conditional-render-media-query";

const HeaderLi = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="flex items-center gap-3">
      <div>
        <BadgeCheckIcon className="size-10" />
      </div>

      {children}
    </li>
  );
};

const Header = () => {
  return (
    <header className="grid max-h-screen min-h-screen grid-cols-12 grid-rows-12">
      <ConditionalRenderMediaQuery
        mediaQuery="(min-width: 1024px)"
        trueComponent={<HeaderCanvas />}
        falseComponent={<HeaderCanvasMobile />}
      />
      <section className="relative hidden flex-col gap-10 px-20 text-light-700 lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-3 lg:flex">
        <h1 className="h2-typography font-bold">Build with knowledge</h1>
        <ul className="h6-typography flex flex-col gap-5">
          <HeaderLi>Learn design patterns</HeaderLi>
          <HeaderLi>Simplify complex concepts</HeaderLi>
          <HeaderLi>Verify your knowledge</HeaderLi>
        </ul>
      </section>
      <SuggestionsCard className="relative col-span-10 col-start-2 row-span-6 row-start-3 lg:col-span-4 lg:col-start-8 lg:row-span-6 lg:row-start-6" />
    </header>
  );
};

export default Header;
