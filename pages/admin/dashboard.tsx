import { useEffect, useState } from "react";

import Link from "next/link";
import { RestEndpointMethodTypes } from "@octokit/rest";

type PullList = RestEndpointMethodTypes["pulls"]["list"]["response"]["data"];

export default function Dashboard() {
  const [pendingPosts, setPendingPosts] = useState<string[]>([]);
  const [publishedposts, setPublishedposts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/getPullRequests")
      .then((res) => res.json())
      .then((data: PullList) =>
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
