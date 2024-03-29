"use client";

import { useRef, useState } from "react";

import EditorComponent from "./components/editor";
import { Post } from "@prisma/client";
import type { Editor as TinyMCEEditor } from "tinymce";
import { commitPostImages } from "./components/git";
import { createPost } from "@/prisma/post";
import slugify from "@/app/utils/slugify";
import { revalidatePost } from "./revalidate";
import Image from "next/image";

export interface Image {
  name: string;
  content: string;
}

export default function EditorForm({ post }: { post: Post | null }) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState(post?.title || "");
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [tag, setTag] = useState(post?.tag || "dessert");

  const uploadImageAndMutateHTML = (parsedHtml: Document, images: Image[]) => {
    if (editorRef.current) {
      [...parsedHtml.getElementsByTagName("img")].forEach((img) => {
        const originalImg = img.cloneNode(true) as HTMLImageElement;

        if (originalImg.src.includes("data:image")) {
          img.src = `/blog/${originalImg.id}.png`;
          images.push({
            name: originalImg.id,
            content: originalImg.src.replace(/^data:image\/\w+;base64,/, ""),
          });
        }
      });
      if (images.length) {
        commitPostImages(images);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editorRef.current) {
      try {
        const content = editorRef.current.getContent();
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(
          content.replaceAll("../blog/", "/blog/"), // Dirty fix for updating post with local images
          "text/html"
        );
        const images: Image[] = [];

        uploadImageAndMutateHTML(parsedHtml, images);

        const slug = slugify(title);

        createPost({
          title,
          tag,
          slug,
          thumbnail: post?.thumbnail,
          content: parsedHtml.body.innerHTML,
        });
        setHasError(false);
        revalidatePost(slug);
      } catch (e) {
        setHasError(true);
        throw e;
      } finally {
        setTimeout(() => setHasError(null), 4000);
      }
    }
  };

  return (
    <div>
      <div
        className={`${hasError !== null ? "visible" : "hidden"} ${
          hasError ? "bg-red-300" : "bg-green-500"
        } z-10 text-white br-2 p-4 fixed left-1/2 bottom-4`}
      >
        {hasError ? "Une erreur est survenue" : "Enregistrement effectué"}
      </div>
      <form onSubmit={handleSubmit} className="m-2 flex flex-col">
        <label className="block font-medium text-gray-900" htmlFor="title">
          Titre :
        </label>
        <input
          className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor="slug"
        >
          URL :
        </label>
        <input
          className="w-1/3 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          disabled
          id="slug"
          value={slugify(title)}
        />
        <br />
        <label
          className="block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="tag"
        >
          Tag :
        </label>
        <p className="block font-medium text-gray-900">
          Miniature :
          <Image
            src={post?.thumbnail || "/blog/no-image.jpg"}
            alt="thumbnail"
            width={200}
            height={200}
          />
        </p>
        <select
          className="w-fit my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option>petitdej</option>
          <option>dessert</option>
          <option>antigaspi</option>
        </select>
        <p className="mb-2">Contenu :</p>
        <EditorComponent initialContent={post?.content} editorRef={editorRef} />

        <button
          className="mt-4 w-1/5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
