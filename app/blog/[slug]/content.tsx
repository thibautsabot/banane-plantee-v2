"use client";

import Parse, { Element, HTMLReactParserOptions } from "html-react-parser";

import Image from "next/image";
import { Post } from "@prisma/client";
import Link from "next/link";

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === "img") {
      return (
        <Link href={domNode.attribs.src}>
          <Image
            src={domNode.attribs.src}
            width={parseInt(domNode.attribs.width) || 400}
            height={parseInt(domNode.attribs.height) || 400}
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
    <div className="mx-auto px-24 pt-8 pb-16 border-candiceBrown rounded-2xl lg:shadow-[0_0_8px_4px_#694c3c] [&>h1]:text-center [&_img]:mx-auto [&_img]:my-8">
      <h1>{post.title}</h1>
      <div>{parsedContent}</div>
      <p className="italic mt-8">
        le {post.createdAt.toLocaleDateString()} dans la catégorie{" "}
        <Link className="text-sky-500 underline" href={`/tags/${post.tag}`}>
          {post.tag}
        </Link>
      </p>
    </div>
  );
}
