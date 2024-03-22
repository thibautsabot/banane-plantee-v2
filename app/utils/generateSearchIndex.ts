import { getAllPosts } from "../../prisma/post";
import { writeFileSync } from "fs";

const generateSearchIndex = async () => {
  const posts = await getAllPosts();
  const searchIndex = posts.map((post, i) => ({
    id: i,
    title: post.title,
  }));

  writeFileSync("./app/utils/searchIndex.json", JSON.stringify(searchIndex))
};

generateSearchIndex();
