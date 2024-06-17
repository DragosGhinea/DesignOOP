/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import { cn } from "@/utils/common";
import { AlertTriangleIcon, InfoIcon, XIcon, XOctagonIcon } from "lucide-react";
import React, { useState } from "react";
import Markdown from "react-markdown";

const Notification = ({
  type,
  content,
  closable,
  id,
}: {
  type: string;
  content: string;
  closable: boolean;
  id?: string;
}) => {
  const IconToUse =
    type === "info"
      ? InfoIcon
      : type === "warning"
        ? AlertTriangleIcon
        : XOctagonIcon;

  const color =
    type === "info" ? "blue" : type === "warning" ? "yellow" : "red";

  const [isClosed, setClosed] = useState(false);

  return (
    <div
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={cn(
        `m-3 flex gap-4 rounded-md border-[1px] border-l-8 bg-opacity-20 p-3 items-center hyphens-auto text-justify`,
        `border-${color}-500 bg-${color}-500`,
        isClosed && "hidden"
      )}
      id={id}
    >
      <IconToUse className={`text-${color}-500 size-8 shrink-0`} />
      <div>
        <Markdown>{content}</Markdown>
      </div>
      {closable && (
        <div className="ml-auto">
          <XIcon
            className={`cursor-pointer text-${color}-500 shrink-0 size-6`}
            onClick={() => setClosed(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
