import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

type CopyButtonProps = {
  copyText: string;
};

export function CopyButton({ copyText }: CopyButtonProps) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  return (
    <Button
      onMouseLeave={() => setCopied(false)}
      onClick={() => {
        copy(copyText);
        setCopied(true);
      }}
      className="flex items-center gap-x-3 px-4 py-2.5 lowercase text-cornsilk bg-pakistan-green rounded-lg"
    >
      <Typography
        className="border-r border-gray-400/50 pr-3 font-normal text-cornsilk"
        variant="small"
      >
        {copyText}
      </Typography>
      {copied ? (
        <CheckIcon className="h-4 w-4 text-cornsilk" />
      ) : (
        <DocumentDuplicateIcon className="h-4 w-4 text-cornsilk" />
      )}
    </Button>
  );
}
