"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, DropdownMenu } from "@/components/ui";
import { toast } from "./ui/Toast";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";

import { AxiosError } from "axios";
import { createApiKey } from "@/helpers/create-api-key";
import { useRouter } from "next/navigation";
import { revokeApiKey } from "@/helpers/revoke-api-key";

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKeyValue: string;
}

const ApiKeyOptions = ({ apiKeyValue }: ApiKeyOptionsProps) => {
  const router = useRouter();
  const [isCreatingNewKey, setIsCreatingNewKey] = useState<boolean>(false);
  const [isRevokingKey, setIsRevokingKey] = useState<boolean>(false);

  const createNewApiKey = async () => {
    setIsCreatingNewKey(true);

    try {
      await revokeApiKey();
      await createApiKey();
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          return toast({
            title: error.response.data,
            message: "Slow down! Wait an hour before trying again.",
            type: "error",
          });
        }
      }

      toast({
        title: "Error creating API key",
        message: "Please try again later.",
        type: "error",
      });
    } finally {
      setIsCreatingNewKey(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevokingKey(true);

    try {
      await revokeApiKey();
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          return toast({
            title: error.response.data,
            message: "Slow down! Wait an hour before trying again.",
            type: "error",
          });
        }
      }

      toast({
        title: "Error revoking API key",
        message: "Please try again later.",
        type: "error",
      });
    } finally {
      setIsRevokingKey(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNewKey || isRevokingKey} asChild>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>
            {isCreatingNewKey
              ? "Creating new key"
              : isRevokingKey
              ? "Revoking key"
              : "Options"}
          </p>

          {isCreatingNewKey || isRevokingKey ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyValue);

            toast({
              title: "Copied successfully!",
              message: "API key copied to clipboard.",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>

        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>

        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
