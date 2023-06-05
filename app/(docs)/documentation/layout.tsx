import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <section className='pt-20'>{children}</section>;
};

export default Layout;
