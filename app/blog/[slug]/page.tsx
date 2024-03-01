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

  return (
    <div>
      <Content post={post} />
    </div>
  );
}
