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

export default function Viewer() {
  const content =
    '<p>Exemple de re<img id="favicon" src="/blog/favicon.png" width="119" height="119">cette cool</p>'; // TODO: get it from the DB
  const test = Parse(content, parserOptions);

  return (
    <div>
      <h1>Viewer</h1>
      <p>Viewer content goes here</p>
      {test}
    </div>
  );
}
