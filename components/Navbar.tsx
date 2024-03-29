import Link from "next/link";
import { Icons, SignInButton, SignOutButton, ThemeToggle } from "@/components";
import { buttonVariants } from "@/ui/Button";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <div className='flex items-center justify-between fixed bg-white/75 backdrop-blur-sm dark:bg-slate-900 z-50 h-20 top-0 inset-x-0 border-b border-slate-300 dark:border-slate-700 shadow-sm'>
      <div className='flex items-center justify-between container w-full max-w-7xl mx-auto'>
        <Link href={"/"} className={buttonVariants({ variant: "link" })}>
          Text Similarity 1.0
        </Link>

        <div className='flex md:hidden gap-2'>
          <ThemeToggle />

          <Link
            href={"/documentation"}
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.FileCode2 />
          </Link>

          {session ? <SignOutButton /> : <SignInButton />}
        </div>

        <div className='hidden md:flex gap-4'>
          <ThemeToggle />

          <Link
            href={"/documentation"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>

          {session ? (
            <>
              <Link
                href={"/dashboard"}
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>

              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
