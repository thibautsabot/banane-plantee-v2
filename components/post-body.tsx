import * as runtime from "react/jsx-runtime";

import { Fragment, useEffect, useState } from "react";

import { run } from "@mdx-js/mdx";

type Props = {
  content: string;
};

const ResponsiveImage = () => <h3 />;

const components = {
  h2: ResponsiveImage,
};

const PostBody = ({ content }: Props) => {
  const [mdxModule, setMdxModule] = useState<any>();
  const Content = mdxModule ? mdxModule.default : Fragment;

  useEffect(() => {
    (async () => {
      setMdxModule(await run(content, runtime));
    })();
  }, [content]);

  return <Content />;
};

export default PostBody;
