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

  return <>{parsedContent}</>;
}
