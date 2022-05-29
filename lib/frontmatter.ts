import * as fs from "node:fs";
import * as yaml from "js-yaml";

import Post from "../types/post";
import { join } from "node:path";

export const postsDirectory = join(process.cwd(), "posts");

export const getFileContent = (slug: string) =>
  fs.readFileSync(join(postsDirectory, `${slug}.mdx`), "utf8");

export function getBlogPostsSlugs({
  limit = 10,
}: {
  limit?: number;
}): string[] {
  const blogPosts = fs.readdirSync(postsDirectory);

  blogPosts.splice(limit, blogPosts.length);
  return blogPosts.map((post) => post.replace(/.mdx/, ""));
}

export const getFrontMatter = (
  fileContents: string
): { frontmatter: Post["frontmatter"]; contentWithoutHeader: string } => {
  const headerStart = fileContents.indexOf("---") + 3;
  const headerEnd = fileContents.indexOf("---", headerStart);
  const header = fileContents.substring(headerStart, headerEnd);
  const contentWithoutHeader = fileContents.substring(headerEnd + 3);

  const frontmatter = yaml.load(header) as Post["frontmatter"];

  return { frontmatter, contentWithoutHeader };
};
