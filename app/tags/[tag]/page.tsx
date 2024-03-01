import Banner from "@/app/layout/banner";
import Image from "next/image";
import Link from "next/link";
import { getPostsByTag } from "@/prisma/post";

const getExcerpt = (content: string) => {
  const isLong = content.length > 700;
  if (isLong) {
    return (
      content
        .substring(0, isLong ? content.lastIndexOf(" ", 700) : 700)
        .replace(/<br\/?>/, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, " ") + "..."
    );
  } else {
    return content
      .replace(/<br\/?>/, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&nbsp;/g, " ");
  }
};

export default async function Tags({ params }: { params: { tag: string } }) {
  const posts = await getPostsByTag(params.tag);

  return (
    <div>
      <Banner />
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[#efefef] rounded text-[#4a4a4a] w-[46%] p-6 m-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          >
            <header className="flex mb-4">
              <Image
                className="mr-8 rounded"
                src="/blog/blinis-couv.png"
                alt=""
                width={180}
                height={180}
              />
              <div className="flex flex-col">
                <Link
                  className="text-candiceBrown text-3xl"
                  href={`/blog/${post.slug}`}
                  key={post.id}
                >
                  {post.title}
                </Link>
                {post.createdAt.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </header>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: getExcerpt(post.content),
              }}
            />
            <Link href={`/blog/${post.slug}`}>
              <button className="bg-white border-2 border-[#dbdbdb] p-2">
                Lire l&apos;article →
              </button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
