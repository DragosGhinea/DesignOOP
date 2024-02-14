import React from "react";
import HeaderCanvas from "./canvas/header-canvas";
import SuggestionsCard from "../suggestion/suggestions-card";

const Header = () => {
  return (
    <header className="grid max-h-screen min-h-screen grid-cols-12 grid-rows-12">
      <HeaderCanvas />
      <section className="relative col-span-4 col-start-1 row-span-3 row-start-3 flex flex-col gap-10 px-20 text-light-700">
        <h1 className="h2-typography font-bold">Build with knowledge</h1>
        <p className="h6-typography">
          Our mission is to help you learn design patterns, making complex
          concepts simple and letting you track your progress every step of the
          way!
        </p>
      </section>
      <SuggestionsCard className="relative col-span-4 col-start-8 row-span-6 row-start-6" />
    </header>
  );
};

export default Header;
