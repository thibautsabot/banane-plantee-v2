import showdown from "showdown";
import { readFileSync, lstatSync, readdirSync } from "fs";
import slugify from "@/app/utils/slugify";
import { createPost } from "@/prisma/post";
import { Post } from "@prisma/client";

const path = process.argv[2];
const converter = new showdown.Converter({ noHeaderId: true });

const convertFile = (file: string) => {
  const md = readFileSync(file, "utf-8");

  const metadata = md.match(/---\n([\s\S]*?)\n---/)?.[0];

  if (!metadata) {
    throw new Error(`No metadata found for file ${file}`);
  }

  const description = metadata.substring(
    metadata.indexOf("description: ") + 13,
    metadata.indexOf("featuredpost") - 1
  ).replaceAll(">", "");

  const title = metadata.match(/title: (.*)/)?.[1].replaceAll("\"", "");
  const tag = metadata.match(/tags:\s+- (.*)/)?.[1];
  const createdAt = metadata.match(/date: (.*)/)?.[1];
  const thumbnail = metadata.match(/featuredimage: (.*)/)?.[1].replaceAll('\/img\/', '/blog/')
  const content = description + "\n" + md.substring(metadata.length).replaceAll('\/img\/', '/blog/').replaceAll("\\", "\n")

  const htmlContent = converter.makeHtml(content)

  if (!title || !tag || !createdAt || !thumbnail) {
    throw new Error(`Missing metadata for file ${file}`);
  }

  const post: Omit<Post, "id"> = {
    title,
    slug: slugify(title),
    tag,
    content: htmlContent,
    createdAt: new Date(createdAt),
    thumbnail,
  };

  return post;
};

const publishPost = async (post: Omit<Post, "id">) => {
  await createPost(post);
  console.log("Creating post...");
  console.log(post);
  console.log("Post created successfully");
};

if (lstatSync(path).isDirectory()) {
  const files = readdirSync(path);

  files.forEach((file) => {
    const filePath = `${path.endsWith("/") ? path : path + "/"}${file}`;

    const post = convertFile(filePath);
    publishPost(post);
  });
} else {
  const post = convertFile(path);
  publishPost(post);
}
