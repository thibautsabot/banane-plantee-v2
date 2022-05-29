import React, { useEffect, useState } from "react";

import Highlighter from "react-highlight-words";
import Link from "next/link";
import elasticlunr from "elasticlunr";
import indexJSON from "../lunrIndex.json";

type Result = {
  title: string;
  id: number;
  slug: string;
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [index, setIndex] = useState<elasticlunr.Index<Result>>();

  useEffect(() => {
    const index = elasticlunr<Result>(function () {
      this.setRef("id");
      this.addField("title");

      for (const blogPost of indexJSON as Result[]) {
        this.addDoc(blogPost);
      }
    });

    setIndex(index);
  }, []);

  const search = (evt: React.FormEvent<HTMLInputElement>) => {
    setQuery(evt.currentTarget.value);
    setResults(
      index
        ?.search(query, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref)) || []
    );
  };

  return (
    <div>
      <div>
        <input value={query} onChange={search} placeholder="Recherche" />
      </div>
      {!!results.length && (
        <ul>
          {results.map((page) => {
            return (
              <li key={page.id}>
                <Link href={`/posts/${page.slug}`}>
                  <Highlighter
                    highlightClassName="hightlight"
                    searchWords={[query]}
                    autoEscape={true}
                    textToHighlight={page.title}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
