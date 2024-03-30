"use client";

import Parse, { Element, HTMLReactParserOptions } from "html-react-parser";

import Image from "next/image";
import { Post } from "@prisma/client";
import Link from "next/link";
import { WORDINGS, isKnownTag } from "@/app/utils/slugToWording";

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === "img") {
      return (
        <Link href={domNode.attribs.src}>
          <Image
            src={domNode.attribs.src}
            width={400}
            height={400}
            alt={domNode.attribs.alt || ""}
          />
        </Link>
      );
    }

    return domNode;
  },
};

export default function Content({ post }: { post: Post }) {
  const parsedContent = Parse(post.content, parserOptions);

  return (
    <div className="bg-white px-4 lg:mx-24 lg:px-48 pt-8 pb-16 border-candiceBrown rounded-2xl lg:shadow-[0_0_8px_4px_#694c3c] [&>h1]:text-center [&_img]:mx-auto [&_img]:my-8">
      <h1 className="text-3xl lg:text-5xl">{post.title}</h1>
      <div>{parsedContent}</div>
      {isKnownTag(post.tag) && (
        <p className="italic mt-8 text-sm text-right">
          Le {post.createdAt.toLocaleDateString()}, dans la catégorie{" "}
          <Link className="text-sky-500 underline" href={`/tags/${post.tag}`}>
            {WORDINGS[post.tag]}
          </Link>
        </p>
      )}
    </div>
  );
}
