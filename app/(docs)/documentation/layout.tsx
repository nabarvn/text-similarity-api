import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='overflow-y-auto h-full lg:scrollbar-thin lg:scrollbar-thumb-slate-300 lg:dark:scrollbar-thumb-slate-500 lg:scrollbar-thumb-rounded-sm py-12'>
      {children}
    </section>
  );
};

export default Layout;
