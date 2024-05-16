"use client";

import GithubIcon from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CopyrightIcon } from "lucide-react";
import React from "react";

const Attribution = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="fixed bottom-0 left-[50%] flex translate-x-[-50%] cursor-pointer flex-nowrap gap-2 text-nowrap rounded-t-md bg-blue-light p-3 text-white dark:bg-blue-dark2">
          <CopyrightIcon /> 2024 Ghinea Dragoș-Dumitru | Bachelor Thesis Project
        </div>
      </DialogTrigger>
      <DialogContent className="flex max-h-full flex-col overflow-hidden">
        <h2 className="h2-typography">Abstract</h2>
        <p className="overflow-y-auto text-justify">
          Design patterns represent a fundamental aspect of software
          development, offering tested solutions and strategies for common
          problems encountered in designing and implementing applications. Not
          only do they facilitate the development of more efficient and easily
          maintainable systems, but they also promote industry-recommended
          standards and practices. The web platform presented in this study is
          dedicated to creating and exploring courses on design patterns in the
          context of object-oriented programming. Providing an integrated
          ecosystem of tools, including a course editor and an interactive
          graphics generator, it simplifies the process of developing
          educational content. A crucial aspect of the platform is its approach
          to design, conceived to be consistent and abstracted, thus ensuring
          the uniformity of the visual aspect of courses and providing a
          seamless and accessible learning experience for users. This thesis
          details the complete process of developing an application, covering
          essential aspects related to frontend, backend, databases, as well as
          security aspects, to provide a comprehensive picture of the
          construction and functionalities of the platform.
        </p>
        <Button
          onClick={() => {
            window.open("https://github.com/DragosGhinea/DesignOOP", "_blank");
          }}
          className="flex gap-3"
        >
          Read More <GithubIcon className="size-8" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Attribution;
