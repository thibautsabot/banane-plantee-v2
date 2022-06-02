import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";

import { useEffect, useRef, useState } from "react";

import Container from "../../components/container";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostTitle from "../../components/post-title";
import type PostType from "../../types/post";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { compile } from "@mdx-js/mdx";
import dynamic from "next/dynamic";
import { getBlogPostsSlugs } from "../../lib/frontmatter";
import { getPostBySlug } from "../../lib/api";
import textToImage from "../../components/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import yaml from "js-yaml";

type PullList = RestEndpointMethodTypes["pulls"]["list"]["response"]["data"];
type PRFiles =
  RestEndpointMethodTypes["pulls"]["listFiles"]["response"]["data"];

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Post = ({ post }: { post?: PostType }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [PRNumber, setPRNumber] = useState(-1);
  const [mdxValue, setMdxValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/admin/signin");
    }
  }, [session, status, router]);

  const saveAsMDX = async (value?: string) => {
    if (value) {
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
    if (PRNumber === 0) {
      getPullRequest();
    }
  };

  const publishBlogPost = async () => {
    await fetch(`/api/mergePullRequest?id=${PRNumber}`);
    setPRNumber(0);
  };

  const getPullRequest = () => {
    return fetch(`/api/getPullRequests?id=${router.query.slug}`)
      .then((res) => res.json())
      .then(async (data: PullList) => {
        if (data.length > 0) {
          const PRNumber = data[0].number;
          setPRNumber(PRNumber);

          const PRFiles: PRFiles = await fetch(
            `/api/getPRContent?id=${PRNumber}`
          ).then((res) => res.json());
          console.log(PRFiles);

          const PRContent = await Promise.all(
            PRFiles.map((file) => {
              return fetch(file.raw_url);
            })
          );

          console.log(PRContent);

          // setValue(post?.fileContent!);
        } else {
          setPRNumber(0);
          setValue(post?.fileContent!);
        }
      });
  };

  useEffect(() => {
    saveAsMDX(value);
  }, [value]);

  useEffect(() => {
    getPullRequest();
  }, []);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        {router.isFallback || PRNumber === -1 ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            {!!PRNumber && (
              <button type="button" onClick={publishBlogPost}>
                Publier
              </button>
            )}
            <button type="button" onClick={saveBlogPost}>
              Sauvegarder
            </button>
            <MDEditor
              preview="edit"
              value={value}
              onChange={(value) => setValue(value || "")}
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
