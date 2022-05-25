import Post from '../types/post';
import { compile } from '@mdx-js/mdx'
import fs from "fs";
import { join } from "path";
import yaml from 'js-yaml'

const postsDirectory = join(process.cwd(), "posts");

export async function getPostBySlug(slug: string): Promise<Post> {
  const fileContents = fs.readFileSync(
    join(postsDirectory, `${slug}.mdx`),
    "utf8"
  );

  const headerStart = fileContents.indexOf('---') + 3
  const headerEnd = fileContents.indexOf("---", headerStart)
  const header = fileContents.substring(headerStart, headerEnd);

  const frontmatter = yaml.load(header) as Post['frontmatter']

  const fileWithoutHeader = fileContents.substring(headerEnd + 3)

  const blogContent = await compile(fileWithoutHeader, {
    outputFormat: 'function-body'
  })

  return { code: String(blogContent), frontmatter, fileContent: fileWithoutHeader, slug };
}

export async function getAllPosts() {
  const slugs = getBlogPostsSlugs({});
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  const postWithSlugs = posts
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    )

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
