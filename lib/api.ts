import { getBlogPostsSlugs, getFileContent, getFrontMatter } from "./frontmatter";

import Post from "../types/post";
import { compile } from "@mdx-js/mdx";

export async function getPostBySlug(slug: string): Promise<Post> {
  const fileContent = getFileContent(slug);

  const { frontmatter, contentWithoutHeader } = getFrontMatter(fileContent);

  const blogContent = await compile(contentWithoutHeader, {
    outputFormat: "function-body",
  });

  return {
    code: String(blogContent),
    frontmatter,
    fileContent: contentWithoutHeader,
    slug,
  };
}

export async function getAllPosts() {
  const slugs = getBlogPostsSlugs({});
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  const postWithSlugs = posts.sort((post1, post2) =>
    post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
  );

  return postWithSlugs;
}
