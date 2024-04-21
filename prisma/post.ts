"use server";

import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost({ slug, content, title, tag, thumbnail, createdAt }: Partial<Post> & Pick<Post, 'slug' | 'content' | 'title' | 'tag'>) {
  await prisma.post.upsert({
    where: {
      slug,
    },
    update: {
      content,
      title,
      tag,
      thumbnail: thumbnail || '',
    },
    create: {
      content,
      title,
      tag,
      slug,
      thumbnail: thumbnail || '',
      createdAt,
    },
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({ where: { slug }})
}

export async function getPostsByTag(tag: string) {
  return await prisma.post.findMany({ where: { tag }, orderBy: { createdAt: 'desc' }})
}

export async function getAllPosts(limit?: number) {
  return await prisma.post.findMany({...limit && { take: limit }, orderBy: { createdAt: 'desc' }})
}