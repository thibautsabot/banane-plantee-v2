import * as runtime from "react/jsx-runtime";

import NextImage, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

import { run } from "@mdx-js/mdx";

type Props = {
  content: string;
};

const components = {
  Image: (props: ImageProps) => <NextImage {...props} />,
};

const PostBody = ({ content }: Props) => {
  const [mdxModule, setMdxModule] = useState<any>();
  const Content = mdxModule?.default;

  useEffect(() => {
    (async () => {
      setMdxModule(await run(content, runtime));
    })();
  }, [content]);

  return mdxModule ? <Content components={components} /> : null;
};

export default PostBody;
