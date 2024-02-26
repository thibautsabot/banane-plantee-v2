"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost(content: string) {
  await prisma.post.create({
    data: {
      content,
      tag: "testTag",
    },
  });
}

export async function getpost(content: string) {
  return await prisma.post.findUniqueOrThrow({ where: { id: 4 }})
}