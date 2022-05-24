import { compile } from "@mdx-js/mdx";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../components/container";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostTitle from "../../components/post-title";
import { getBlogPostsSlugs, getPostBySlug } from "../../lib/api";
import type Post from "../../types/post";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Post = ({ post }: { post: Post }) => {
  const router = useRouter();
  const [value, setValue] = useState(post.fileContent || "");
  const [mdxValue, setMdxValue] = useState("");

  const saveAsMDX = async (value: string) => {
    setValue(value);

    const content = await compile(value, {
      outputFormat: "function-body",
    });
    setMdxValue(String(content));
  };

  useEffect(() => {
    saveAsMDX(value);
  }, []);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <MDEditor
              preview="edit"
              value={value}
              onChange={saveAsMDX as any}
            />
            <PostBody content={mdxValue} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const slugs = getBlogPostsSlugs({});

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false, // Every pages are statically generated a build time.
  };
}
