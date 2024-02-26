import EditorComponent from "./editor";
import React from "react";
import { getpost } from "@/prisma/post";

export default async function Editor() {
  // If there are some images in the post, their path should be valid since they have been prievously uploaded
  // so we don't need to replace the occurences with next/image (like we are doing for the viewer).

  // Edge case: if the post is REALLY recent, the commit and the deploy may not have been done yet,
  // making the image 404. It's an acceptable behavior for now as the benefits are greater than the drawbacks.
  // It allows us to not store the base64 in the db and in the requests.
  const initialContent = await getpost("");

  return (
    <>
      <EditorComponent initialContent={initialContent.content} />
    </>
  );
}
