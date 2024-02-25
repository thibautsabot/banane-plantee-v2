"use client";

import Parse, { Element, HTMLReactParserOptions } from "html-react-parser";

import Image from "next/image";

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === "img") {
      return (
        <Image
          src={`/blob/${domNode.attribs.name}.png`}
          width={parseInt(domNode.attribs.width) || 200}
          height={parseInt(domNode.attribs.height) || 200}
          alt={domNode.attribs.alt || ""}
        />
      );
    }

    return domNode;
  },
};

export default function Viewer() {
  const content =
    "<img name='favicon' width='300' height='300' alt='A cool image' />"; // TODO: get it from the DB
  const test = Parse(content, parserOptions);

  return (
    <div>
      <h1>Viewer</h1>
      <p>Viewer content goes here</p>
      {test}
    </div>
  );
}
