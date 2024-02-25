"use client";

import React, { useRef } from "react";

import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import base64ToId from "../utils/base64toid";
import { commitPostImages } from "../utils/git";

export default function EditorComponent() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const uploadImage = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(content, "text/html");

      const images = Array.from(parsedHtml.getElementsByTagName("img")).map(
        (img) => {
          return {
            name: base64ToId(img.src),
            content: img.src.replace(/^data:image\/\w+;base64,/, ""),
          };
        }
      );
      console.log(images);
      commitPostImages(images);
    }
  };

  return (
    <>
      <Editor
        id="tiny-mce-editor"
        tinymceScriptSrc={"/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onDrop={(evt) => {
          const file = evt.dataTransfer?.files[0];
          console.log(file?.name);

          // TODO append name to image in the editor content
        }}
        initialValue="<p>This is the initial content of the editor.</p>"
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
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
      <br />
      <button onClick={uploadImage}>UPLOAD</button>
    </>
  );
}
