"use client";

import FlexSearch from "flexsearch";
import searchIndex from "../utils/searchIndex.json";
import { useState } from "react";

const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <p>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase() ? "bg-amber-300" : ""
          }
        >
          {part}
        </span>
      ))}
    </p>
  );
};

const index = new FlexSearch.Index({
  tokenize: "full",
});

searchIndex.forEach((post) => {
  index.add(post.id, post.title);
});

export default function Search() {
  const [value, setValue] = useState("");
  const [matches, setMacthes] = useState<string[]>([]);

  return (
    <div>
      <input
        type="text"
        className="text-black"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          const res = index.search(e.target.value) as number[];

          setMacthes(res.map((id) => searchIndex[id].title));
        }}
      />
      <div>{matches.map((match) => getHighlightedText(match, value))}</div>
    </div>
  );
}
