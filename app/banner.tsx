"use client";

import { WORDINGS, Wording, isKnownSlug } from "./utils/slugToWording";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname().replace("/tags/", "");

  return (
    <div role="banner" className="w-3/4 m-auto flex h-[200px] relative">
      <Image
        priority
        fill
        className="banner"
        src="/banner.webp"
        style={{
          objectFit: "cover",
        }}
        alt="banniere banane plantee"
      />
      {isKnownSlug(pathname) && (
        <h1 className="border-white border-4 absolute text-center left-1/2 top-[45%] p-4 -translate-x-1/2 -translate-y-[45%] text-white text-4xl font-bold">
          {WORDINGS[pathname]}
        </h1>
      )}
    </div>
  );
}
