import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export async function getPostBySlug(slug: string) {
  const fileContents = fs.readFileSync(
    join(postsDirectory, `${slug}.mdx`),
    "utf8"
  );
  const blogContent = await bundleMDX({ source: fileContents });
  const { code, frontmatter } = blogContent;

  return { code, frontmatter };
}

export async function getAllPosts() {
  const slugs = getBlogPostsSlugs({});
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  const postWithSlugs = posts
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    )
    .map((post) => ({
      ...post,
      slug: post.frontmatter.title
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-")
        .toLowerCase(),
    }));

  return postWithSlugs;
}

export function getBlogPostsSlugs({
  limit = 10,
}: {
  limit?: number;
}): string[] {
  const blogPosts = fs.readdirSync(postsDirectory);

  blogPosts.splice(limit, blogPosts.length);
  return blogPosts.map((post) => post.replace(/.mdx/, ""));
}
