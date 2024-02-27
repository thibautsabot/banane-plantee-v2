import Link from "next/link";
import { getAllPosts } from "@/prisma/post";

export default async function Editor() {
  const posts = await getAllPosts();

  console.log("EDITOR: get all posts", posts);

  return (
    <div>
      <h1>Editor</h1>
      {posts.map((post) => (
        <Link href={`/editor/${post.slug}`} key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </Link>
      ))}
    </div>
  );
}
