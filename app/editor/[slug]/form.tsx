"use client";

import { useRef, useState } from "react";

import EditorComponent from "./components/editor";
import type { Editor as TinyMCEEditor } from "tinymce";
import { commitPostImages } from "./components/git";
import { createPost } from "@/prisma/post";
import slugify from "@/app/utils/slugify";

export interface Image {
  name: string;
  content: string;
}

export default function EditorForm({
  initialContent,
}: {
  initialContent: string;
}) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState("");

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
      const content = editorRef.current.getContent();
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(content, "text/html");
      const images: Image[] = [];

      uploadImageAndMutateHTML(parsedHtml, images);

      console.log(e);
      console.log(parsedHtml.body.innerHTML);

      //   createPost({
      //     title: e.,
      //     content: parsedHtml.body.innerHTML,
      //   });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          {title}
        </input>
        <input disabled id="slug">
          {slugify(title)}
        </input>
        <EditorComponent
          initialContent={initialContent}
          editorRef={editorRef}
        />
        <select>
          <option>testTag</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
