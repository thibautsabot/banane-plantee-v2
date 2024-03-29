"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePost(slug: string) {
  const pagePath = `/blog/${slug}`;

  console.log(`Revalidating post ${pagePath}`);
  revalidatePath(pagePath);
}
