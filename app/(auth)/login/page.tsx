import { buttonVariants } from "@/components/ui/Button";
import { Heading, Paragraph } from "@/components/ui";
import { UserAuthForm, Icons } from "@/components";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className='absolute container inset-0 mx-auto h-screen flex flex-col items-center justify-center'>
        <div className='w-full mx-auto flex flex-col justify-center space-y-6 max-w-lg'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <Link
              className={buttonVariants({
                variant: "ghost",
                className: "w-fit",
              })}
              href='/'
            >
              <Icons.ChevronLeft className='mr-2 h-4 w-4' />
              Back to home
            </Link>

            <Heading>Welcome back!</Heading>

            <Paragraph>Please sign in using your Google account.</Paragraph>
          </div>

          <UserAuthForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
