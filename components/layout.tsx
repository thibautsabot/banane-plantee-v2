import React, { useState } from "react";

import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import indexJSON from "../lunrIndex.json";
import lunr from "lunr";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const index = lunr(function () {
    this.ref("id");
    this.field("title");
    this.field("slug");

    for (const blogPost of indexJSON) {
      this.add(blogPost);
    }
  });

  const [query, setQuery] = useState("");

  const results = index.search(`*${query}*`);
  console.log(results);

  return (
    <>
      <Meta />
      <Header />
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
