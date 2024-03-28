import Link from "next/link";
import { getAllPosts } from "@/prisma/post";

export default async function Editor() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>Edition</h1>
      {posts.map((post) => (
        <Link
          className="flex items-center"
          href={`/editor/${post.slug}`}
          key={post.id}
        >
          <h2 className="px-4">{post.title}</h2>
          <p>{new Date(post.createdAt).toLocaleString("fr")}</p>
        </Link>
      ))}
    </div>
  );
}
