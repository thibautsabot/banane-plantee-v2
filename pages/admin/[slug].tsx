import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

import { useEffect, useRef, useState } from "react";

import Container from "../../components/container";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostTitle from "../../components/post-title";
import type PostType from "../../types/post";
import { compile } from "@mdx-js/mdx";
import dynamic from "next/dynamic";
import { getBlogPostsSlugs } from "../../lib/frontmatter";
import { getPostBySlug } from "../../lib/api";
import textToImage from "../../components/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import yaml from "js-yaml";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Post = ({ post }: { post?: PostType }) => {
  const { data: session, status } = useSession();
  console.log("session : ", session);
  const router = useRouter();
  const [value, setValue] = useState(post?.fileContent || "");
  const [mdxValue, setMdxValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/admin/signin");
    }
  }, [session]);

  const saveAsMDX = async (value?: string) => {
    if (value) {
      setValue(value);

      const content = await compile(value, {
        outputFormat: "function-body",
      });
      setMdxValue(String(content));
    }
  };

  const saveBlogPost = async () => {
    const header = yaml.dump(post?.frontmatter);
    const content = `---\n${header}\n---\n${value}`;

    await fetch("/api/uploadPost", {
      method: "POST",
      body: JSON.stringify({
        content,
        slug: router.query.slug,
      }),
    });
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
            <button type="button" onClick={saveBlogPost}>
              Sauvegarder
            </button>
            <MDEditor
              preview="edit"
              value={value}
              onChange={saveAsMDX}
              extraCommands={[textToImage]}
            />
            <PostBody content={mdxValue} />
            <input
              ref={fileRef}
              id="file-input"
              type="file"
              style={{ display: "none" }}
            />
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
