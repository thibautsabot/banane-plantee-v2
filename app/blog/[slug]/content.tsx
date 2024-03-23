"use client";

import Parse, { Element, HTMLReactParserOptions } from "html-react-parser";

import Image from "next/image";
import { Post } from "@prisma/client";

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === "img") {
      return (
        <Image
          src={domNode.attribs.src}
          width={parseInt(domNode.attribs.width)}
          height={parseInt(domNode.attribs.height)}
          alt={domNode.attribs.alt || ""}
        />
      );
    }

    return domNode;
  },
};

export default function Content({ post }: { post: Post }) {
  const parsedContent = Parse(post.content, parserOptions);

  return (
    <div className="mx-auto px-24 pt-8 pb-16 border-candiceBrown rounded-2xl lg:shadow-[0_0_8px_4px_#694c3c] [&>h1]:text-center [&_img]:mx-auto [&_img]:my-8">
      {parsedContent}
    </div>
  );
}
