import React, { useRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useDebounceCallback } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

const CodeInputs = ({
  codes,
  updateCodes,
}: {
  codes: { [key: string]: string };
  updateCodes: (key: string, value: string | undefined) => void;
}) => {
  const debouncedUpdateCodes = useDebounceCallback(updateCodes, 500);
  const addSnippetRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h5 className="h5-typography px-2 font-bold">Code Snippets</h5>
      <div className="px-5">
        <p className="text-muted-foreground">
          Manage code snippets. You can use them in the code box config below.
          <br />
          Usually you will use an external editor and just copy paste the code
          here.
        </p>
        <Accordion type="single" collapsible>
          {Object.entries(codes).map(([key, value]) => {
            return (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger>{key}</AccordionTrigger>
                <AccordionContent className="relative h-[350px]">
                  <Button
                    className="absolute bottom-4 right-0 m-2 mr-8"
                    variant="destructive"
                    onClick={() => {
                      updateCodes(key, undefined);
                    }}
                  >
                    Delete Snippet
                  </Button>
                  <Textarea
                    className="size-full max-h-full resize-none rounded-none bg-slate-100 text-sm dark:bg-dark-300"
                    defaultValue={value}
                    onChange={(e) => {
                      debouncedUpdateCodes(key, e.target.value);
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <div className="flex items-center gap-3 rounded-sm bg-slate-200 px-3 py-4 dark:bg-slate-900">
          <Input
            ref={addSnippetRef}
            className="w-60"
            placeholder="Example: Snippet1"
          />
          <Button
            onClick={() => {
              const snippetName = addSnippetRef.current?.value;
              if (!snippetName) {
                toast.error("Snippet name is required");
                return;
              }

              if (snippetName in codes) {
                toast.error("Snippet with that name already exists");
                return;
              }

              addSnippetRef.current.value = "";
              updateCodes(snippetName, "");
            }}
          >
            <PlusIcon className="mr-2" /> Snippet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeInputs;
