"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePost(page: string) {
  console.log(`Revalidating post ${page}`);
  revalidatePath(page);
}
