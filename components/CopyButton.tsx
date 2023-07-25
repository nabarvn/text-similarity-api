"use client";

import { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui";
import { toast } from "./ui/Toast";
import { Copy } from "lucide-react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton = ({ valueToCopy, className, ...props }: CopyButtonProps) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: "Copied successfully!",
          message: "API key copied to clipboard.",
          type: "success",
        });
      }}
      variant='ghost'
      className={className}
    >
      <Copy className='h-5 w-5' />
    </Button>
  );
};

export default CopyButton;
