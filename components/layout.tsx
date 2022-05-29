import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import Search from "./Search";

type Props = {
  children: React.ReactNode;
};

type Index = {
  title: string;
  id: number;
  slug: string;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <Search />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
