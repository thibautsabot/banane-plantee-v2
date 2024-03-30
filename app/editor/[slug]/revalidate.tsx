"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePost({
  slug,
  tag,
}: {
  slug: string;
  tag: string;
}) {
  const pagePath = `/blog/${slug}`;
  const tagPath = `/tags/${tag}`;

  console.log(`Revalidating post ${pagePath}`);
  revalidatePath(pagePath);
  console.log(`Revalidating tag ${tagPath}`);
  revalidatePath(tagPath);
}
