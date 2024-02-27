import Link from "next/link";
import { getPostsByTag } from "@/prisma/post";

export default async function Tags({ params }: { params: { tag: string } }) {
  const posts = await getPostsByTag(params.tag);

  console.log("VIEWVER: get all post by tags", posts);

  return (
    <div>
      <h1>Viewer</h1>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </Link>
      ))}
    </div>
  );
}
