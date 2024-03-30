"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import useOnClickOutside from "../utils/useOnClickOutside";
import { usePathname } from "next/navigation";

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
  {
    href: "/presentation",
    text: `${String.fromCodePoint(0x1f34c)} Qui suis-je ?`,
  },
];

export default function Nav() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const burgerRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useOnClickOutside(articleRef, () => setIsArticleOpen(false));

  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        ref={burgerRef}
        onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        className={`${
          isBurgerMenuOpen ? "mx-auto" : "mx-8"
        } m-6 w-8 h-8 flex lg:hidden justify-around flex-col flex-nowrap z-10`}
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
            } hover:underline`}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
}
