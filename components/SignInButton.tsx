"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/Toast";
import { LogIn } from "lucide-react";

const SignInButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error signing in",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className='hidden md:block'>
        <Button onClick={signInWithGoogle} isLoading={isLoading}>
          Sign in
        </Button>
      </div>

      <div className='block md:hidden'>
        <Button onClick={signInWithGoogle} size='sm' variant='ghost'>
          <LogIn />
        </Button>
      </div>
    </>
  );
};

export default SignInButton;
