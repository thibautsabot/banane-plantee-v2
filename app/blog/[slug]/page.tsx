import Content from "./content";
import { getPostBySlug } from "@/prisma/post";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  console.log("BLOG: get post by slug", post);

  return (
    <div>
      <h1>Viewer</h1>
      <Content content={post.content} />
    </div>
  );
}
