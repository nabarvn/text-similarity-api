"use client";

import { FormEvent, useState } from "react";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Button, Heading, Input, Paragraph } from "@/components/ui";
import { CopyButton } from "@/components";

const RequestApiKey = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // to indicate that the process has started
    setIsCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
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
        title: "Error",
        message: "Something went wrong.",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />

        <Heading>Request your API key</Heading>

        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className="sm:flex sm:items-center mt-6"
        action="#"
      >
        <div className="relative rounded-md shadow-md sm:min-w-0 sm:flex-1">
          {apiKey && (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
            />
          )}

          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here..."
          />
        </div>

        <div className="sm:flex-shrink-0 sm:mt-0 sm:ml-4 flex justify-center mt-3">
          <Button disabled={!!apiKey || isCreating} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
