"use client";

import Parse, { Element, HTMLReactParserOptions } from "html-react-parser";

import Image from "next/image";

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

export default function Content({ content }: { content: string }) {
  const test = Parse(content, parserOptions);

  return <>{test}</>;
}
