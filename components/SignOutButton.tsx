"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/Toast";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className='hidden md:block'>
        <Button onClick={signUserOut} isLoading={isLoading}>
          Sign out
        </Button>
      </div>

      <div className='block md:hidden'>
        <Button onClick={signUserOut} size='sm' variant='ghost'>
          <LogOut />
        </Button>
      </div>
    </>
  );
};

export default SignOutButton;
