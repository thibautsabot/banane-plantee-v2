import Link from "next/link";
import { getAllPosts } from "@/prisma/post";

export default async function Editor() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>Edition</h1>
      <Link href="/editor/new">
        <button
          className="mt-4 w-1/5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          Nouveau post
        </button>
      </Link>
      <hr className="border-2 border-dashed border-black mt-6 mb-4" />
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
