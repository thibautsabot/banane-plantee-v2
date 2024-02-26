import Content from "./content";
import { getpost } from "@/prisma/post";

export default async function Viewer() {
  const post = await getpost("");

  console.log(post);

  return (
    <div>
      <h1>Viewer</h1>
      <p>Viewer content goes here</p>
      <Content content={post.content} />
    </div>
  );
}
