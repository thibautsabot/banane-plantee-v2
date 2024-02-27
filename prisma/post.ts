"use server";

import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost({ slug, content, title, tag }: Post) {
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
  return await prisma.post.findUniqueOrThrow({ where: { slug }})
}

export async function getPostsByTag(tag: string) {
  return await prisma.post.findMany({ where: { tag }})
}

export async function getAllPosts(limit?: number) {
  return await prisma.post.findMany({...limit && { take: limit }})
}