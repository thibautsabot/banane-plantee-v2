import { useEffect, useState } from "react";

import Link from "next/link";

export default function Dashboard() {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [publishedposts, setPublishedposts] = useState([]);

  useEffect(() => {
    fetch("/api/getPendingPosts")
      .then((res) => res.json())
      .then((data) =>
        setPendingPosts(
          data.map((post) => post.head.ref.substring("new-blog-".length))
        )
      );

    fetch("/api/getPublishedPosts")
      .then((res) => res.json())
      .then((data) => setPublishedposts(data));
  }, []);

  return (
    <>
      <h2> Modification non publiées :</h2>
      {pendingPosts.map((post) => {
        return (
          <div key={post}>
            <Link href={`/admin/${post}`}>{post}</Link>
          </div>
        );
      })}
      <h2> Posts en ligne :</h2>
      {publishedposts
        .filter(
          (el) =>
            !pendingPosts.includes(el.substring(0, el.length - ".mdx".length))
        )
        .map((post) => {
          const title = post.substring(0, post.length - ".mdx".length);
          return (
            <div key={post}>
              <Link href={title}>{title}</Link>
            </div>
          );
        })}
    </>
  );
}
