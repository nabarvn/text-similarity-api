import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { Navbar, Providers } from "@/components";
import { Toaster } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className='min-h-screen bg-slate-50 dark:bg-slate-900 antialiased'>
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />

          {children}

          <Toaster position='bottom-right' />
        </Providers>

        {/* Allow for more height on mobile devices */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  );
}
