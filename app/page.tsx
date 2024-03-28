import Banner from "./layout/banner";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/prisma/post";

export default async function Home() {
  const posts = await getAllPosts(9);

  return (
    <main className="w-3/4 mx-auto">
      <Banner />
      <h1 className="my-4 text-4xl">Bienvenue dans ma cuisine !</h1>
      <p>
        Passionnée de cuisine depuis des années, je réalise de nombreuses
        recettes. En tant amatrice, je fais une cuisine simple au quotidien mais
        que j&apos;exécute avec le plus de gourmandise possible.
        <br /> <br />
        En fonction de mes humeurs et mes envies je vous partage des recettes
        autant sucrées que salées. <br /> <br />
        <Link
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="/presentation"
        >
          Si vous voulez en savoir plus sur moi
        </Link>{" "}
        et sur les raisons de la création de ce blog, n&apos;hésitez pas à vous
        rendre dans la partie présentation.
      </p>
      <br />
      <p>
        Bonne visite sur <strong>Bananeplantée !</strong>
      </p>
      <h1 className="my-4 text-4xl">Derniers articles</h1>
      <div className="flex flex-wrap flex-col lg:grid lg:grid-cols-3 lg:gap-4">
        {posts.map((post) => {
          return (
            <article
              key={post.id}
              className="flex flex-col justify-between overflow-hidden break-words flex-none bg-[#efefef] rounded text-[#4a4a4a] p-6 my-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
            >
              <Image
                className="rounded h-[250px] object-cover"
                src={post.thumbnail}
                alt=""
                width={250}
                height={250}
              />
              <Link
                className="text-candiceBrown hover:text-[#a68563] line-clamp-3 text-2xl"
                href={`/blog/${post.slug}`}
                key={post.id}
              >
                {post.title}
              </Link>
              <p>
                {post.createdAt.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Link href={`/blog/${post.slug}`}>
                <button className="bg-white border-2 border-[#dbdbdb] p-2">
                  Lire l&apos;article →
                </button>
              </Link>
            </article>
          );
        })}
      </div>
      <Image
        className="mx-auto my-8"
        src="/round-logo.png"
        alt=""
        width={150}
        height={150}
      />
    </main>
  );
}
