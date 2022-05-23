import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

type Props = {
  content: string;
};

const ResponsiveImage = () => <h3 />;

const components = {
  h2: ResponsiveImage,
};

const PostBody = ({ content }: Props) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);

  return (
    <div className="max-w-2xl mx-auto">
      <Component components={{}} />
    </div>
  );
};

export default PostBody;
