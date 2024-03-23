"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    href: "/tags/apero",
    text: "Apéritifs",
  },
  {
    href: "/tags/entree",
    text: "Entrées",
  },
  {
    href: "/tags/vegetarien",
    text: "Plats végétariens",
  },
  {
    href: "/tags/plats",
    text: "Plats",
  },
  {
    href: "/tags/dessert",
    text: "Desserts",
  },
  {
    href: "/tags/petitdej",
    text: "Petits déjeuners",
  },
  {
    href: "/tags/boissons",
    text: "Boissons",
  },
  {
    href: "/tags/autres",
    text: "Autres",
  },
  {
    href: "/tags/antigaspi",
    text: "Anti-gaspi",
  },
];

export default function Nav() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const pathname = usePathname();

  // TODO: Handle click outside
  return (
    <>
      <div
        onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        className={`${
          isBurgerMenuOpen ? "mx-auto" : "mx-8"
        } my-8 w-8 h-8 flex lg:hidden justify-around flex-col flex-nowrap z-10`}
      >
        <div className="w-8 h-1 rounded bg-white" />
        <div className="w-8 h-1 rounded bg-white" />
        <div className="w-8 h-1 rounded bg-white" />
      </div>
      <div
        className={`${
          isBurgerMenuOpen ? "flex flex-col" : "hidden"
        }  text-center lg:flex lg:items-center relative`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            className={`px-3 py-2 ${
              pathname === link.href ? "underline" : ""
            } `}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
        <div
          className={`${
            isBurgerMenuOpen ? "my-4" : "mx-4"
          } flex justify-center align-middle`}
          onClick={() => setIsArticleOpen(!isArticleOpen)}
        >
          <p
            className={
              pathname === "/zero-dechet" || pathname === "/presentation"
                ? "underline"
                : ""
            }
          >
            Article
          </p>
          <span
            className={`ml-4 border-2 border-white border-r-0 border-t-0
          block h-3 w-3 z-10 origin-center ${
            isArticleOpen ? "rotate-[135deg] mt-2" : "-rotate-45  mt-1"
          }`}
          />
        </div>
        {isArticleOpen && (
          <div className="z-10 flex flex-col lg:absolute lg:top-full lg:right-0 lg:bg-candiceBrown px-4">
            <Link className="pb-2" href="/presentation">
              Présentation
            </Link>
            <Link className="pb-2" href="/zero-dechet">
              Zéro Déchet
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
