"use client";

import React, { MutableRefObject } from "react";

import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import blobToBase64 from "../../../utils/blobToBase64";
import slugify from "../../../utils/slugify";

export default function EditorComponent({
  initialContent = "",
  editorRef,
}: {
  initialContent?: string;
  editorRef: MutableRefObject<TinyMCEEditor | null>;
}) {
  const onDropEvent = async (evt: DragEvent) => {
    const files = evt.dataTransfer?.files;

    // If there is no new files, it means we just moved an existing file around
    if (!files || !files.length) return;

    evt.preventDefault();

    if (files?.length) {
      [...files].forEach(async (file) => {
        const base64 = await blobToBase64(file);

        editorRef.current?.insertContent(
          `<img id="${slugify(`${file.name}`)}" src="${
            base64.content
          }" width="${base64.width}" height="${base64.height}" />`
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
        initialValue={initialContent}
        init={{
          height: 500,
          language: "fr_FR",
          menubar: "edit format tools",
          promotion: false,
          statusbar: false,
          plugins: [
            "advlist",
            "autolink",
            "emoticons",
            "lists",
            "link",
            "image",
            "searchreplace",
            "fullscreen",
            "table",
            "image",
            "preview",
            "wordcount",
            "hr",
          ],
          toolbar:
            "undo redo | blocks |" +
            "bold italic forecolor | alignleft aligncenter alignright alignjustify |" +
            "link | emoticons | hr | searchreplace | table | preview |" +
            "bullist numlist outdent indent | " +
            "removeformat",
        }}
      />
    </>
  );
}
