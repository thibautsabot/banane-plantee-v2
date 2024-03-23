"use client";

import { useRef, useState } from "react";

import FlexSearch from "flexsearch";
import Image from "next/image";
import Link from "next/link";
import searchIndex from "../utils/searchIndex.json";
import useOnClickOutside from "../utils/useOnClickOutside";

const index = new FlexSearch.Index({
  tokenize: "full",
});

searchIndex.forEach((post) => {
  index.add(post.id, post.title);
});

export default function Search() {
  const [value, setValue] = useState("");
  const [matches, setMacthes] = useState<{ title: string; slug: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(resultRef, () => setIsOpen(false));

  return (
    <div ref={resultRef}>
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

            if (res.length) {
              setIsOpen(true);
            }
            setMacthes(
              res.map((id) => ({
                title: searchIndex[Number(id)].title,
                slug: searchIndex[Number(id)].slug,
              }))
            );
          }}
        />
      </div>
      {!!matches.length && isOpen && (
        <ul className="z-10 absolute mt-3 p-2 bg-white w-[220px] md:w-[400px] before-content-[''] before:border-solid before:z-10 before:absolute before:-top-[9px] before:left-[10px] before:border-b-[10px] before:border-b-white before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent">
          {matches.map((match) => {
            const parts = match.title.split(new RegExp(`(${value})`, "gi"));

            return (
              <li key={match.slug} className="text-black list-none text-center">
                <Link
                  href={`/blog/${match.slug}`}
                  onClick={() => setIsOpen(false)}
                >
                  {parts.map((part, i) => (
                    <span
                      key={i}
                      className={
                        part.toLowerCase() === value.toLowerCase()
                          ? "bg-candiceBrown text-white"
                          : ""
                      }
                    >
                      {part}
                    </span>
                  ))}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
