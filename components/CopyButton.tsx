"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { Button } from "@/components/ui";
import { toast } from "./ui/Toast";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton = ({ valueToCopy, className, ...props }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
        setIsCopied(true);

        toast({
          title: "Copied successfully!",
          message: "API key copied to clipboard.",
          type: "success",
        });

        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }}
      variant='ghost'
      className={className}
    >
      {isCopied ? <Check className='h-5 w-5' /> : <Copy className='h-5 w-5' />}
    </Button>
  );
};

export default CopyButton;
