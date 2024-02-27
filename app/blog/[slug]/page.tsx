import Content from "./content";
import { getPostBySlug } from "@/prisma/post";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  console.log("BLOG: get post by slug", post);

  return (
    <div>
      <h1>Viewer</h1>
      <Content post={post} />
    </div>
  );
}
