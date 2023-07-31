import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500 scrollbar-thumb-rounded-sm'>
      {children}
    </section>
  );
};

export default Layout;
