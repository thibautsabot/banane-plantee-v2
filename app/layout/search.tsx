"use client";

import FlexSearch from "flexsearch";
import Image from "next/image";
import searchIndex from "../utils/searchIndex.json";
import { useState } from "react";

const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <li className="text-black list-none text-center">
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? "bg-candiceBrown text-white"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </li>
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
      <div className="bg-white flex rounded-full w-[200px] px-2">
        <Image
          alt="recherche"
          width="15"
          height="20"
          src="/search.svg"
          className="search-icon"
        />
        <input
          type="text"
          className="text-black border-none outline-none w-[150px] py-2 pl-2 text-sm"
          placeholder="Recherche"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            const res = index.search(e.target.value);

            setMacthes(res.map((id) => searchIndex[Number(id)].title));
          }}
        />
      </div>
      {!!matches.length && (
        <ul className="z-10 absolute mt-3 p-2 bg-white w-[400px] before-content-[''] before:border-solid before:z-10 before:absolute before:-top-[9px] before:left-[10px] before:border-b-[10px] before:border-b-white before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent">
          {matches.map((match) => getHighlightedText(match, value))}
        </ul>
      )}
    </div>
  );
}
