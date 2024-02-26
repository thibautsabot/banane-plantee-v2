"use client";

import React, { useRef } from "react";

import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import blobToBase64 from "../utils/blobToBase64";
import { commitPostImages } from "./git";
import slugify from "../utils/slugify";

export interface Image {
  name: string;
  content: string;
}

export default function EditorComponent() {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const uploadImage = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(content, "text/html");
      const images: Image[] = [];

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
      // savePostToDb(content)
    }
  };

  const onDropEvent = async (evt: DragEvent) => {
    const files = evt.dataTransfer?.files;

    // If there is no new files, it means we just moved an existing file around
    if (!files || !files.length) return;

    evt.preventDefault();

    if (files?.length) {
      [...files].forEach(async (file) => {
        const base64 = await blobToBase64(file);

        // TODO: pass the post id to the slugify function
        editorRef.current?.insertContent(
          `<img id="${slugify(file.name)}" src="${base64.content}" width="${
            base64.width
          }" height="${base64.height}" />`
        );
      });
    }
  };

  return (
    <>
      <Editor
        id="tiny-mce-editor"
        tinymceScriptSrc={"/tinymce/tinymce.min.js"}
        onDrop={onDropEvent}
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue="<p>Exemple de recette cool</p>" // TODO: Parse the content from the DB and replace image with next component
        init={{
          height: 500,
          language: "fr_FR",
          menubar: false,
          promotion: false,
          statusbar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "image",
            "preview",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "image" +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
        }}
      />
      <button onClick={() => console.log(editorRef.current?.getContent())}>
        Log editor content
      </button>
      <br />
      <button onClick={uploadImage}>UPLOAD</button>
    </>
  );
}
