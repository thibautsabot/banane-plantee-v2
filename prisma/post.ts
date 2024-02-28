"use server";

import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost({ slug, content, title, tag }: Omit<Post, 'id' | 'createdAt'>) {
  console.log("createPost", { slug, content, title, tag })
  // TODO: Update post if slug already exists
  await prisma.post.create({
    data: {
      content,
      title,
      tag,
      slug,
      thumbnail: "",
    },
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({ where: { slug }})
}

export async function getPostsByTag(tag: string) {
  return await prisma.post.findMany({ where: { tag }})
}

export async function getAllPosts(limit?: number) {
  return await prisma.post.findMany({...limit && { take: limit }})
}