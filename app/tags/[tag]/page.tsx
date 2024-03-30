import Banner from "@/app/layout/banner";
import Image from "next/image";
import Link from "next/link";
import { getPostsByTag } from "@/prisma/post";
import { WORDINGS } from "@/app/utils/slugToWording";

export async function generateStaticParams() {
  const tags = Object.keys(WORDINGS);

  return tags.map((tag) => ({
    slug: tag,
  }));
}

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
            className="bg-[#efefef] rounded text-[#4a4a4a] lg:w-[46%] p-6 m-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          >
            <Link href={`/blog/${post.slug}`}>
              <header className="block lg:flex mb-4">
                <Image
                  className="mx-auto lg:mx-0 lg:mr-8 rounded"
                  src={post.thumbnail}
                  alt=""
                  width={180}
                  height={180}
                />
                <div className="flex flex-col">
                  <p className="text-candiceBrown text-3xl" key={post.id}>
                    {post.title}
                  </p>
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
