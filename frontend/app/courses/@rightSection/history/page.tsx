"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

const HistoryLeft = () => {
  const [, , clearHistory] = useLocalStorage("courseViewHistory", []);
  return (
    <div className="flex size-full min-w-40 flex-col items-center justify-center gap-3 p-2">
      <p className="text-center font-bold text-muted-foreground">
        If you want to clear your history, click the button below.
      </p>
      <Button className="flex gap-2" onClick={clearHistory}>
        <Trash2Icon className="size-8" /> Clear History
      </Button>
    </div>
  );
};

export default HistoryLeft;
