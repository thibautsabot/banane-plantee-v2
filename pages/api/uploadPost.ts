import type { NextApiRequest, NextApiResponse } from "next";

import { commitBlogPost } from "../../lib/git";
import fs from "node:fs";
import { getSession } from "next-auth/react";
import path from "node:path";

export interface Body {
  content: string;
  slug: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const body: Body = JSON.parse(req.body);
    const folder = path.join(process.cwd() + `/posts/`);

    fs.writeFileSync(
      path.join(`${folder}/${body.slug}.mdx`),
      body.content,
      "utf8"
    );

    await commitBlogPost(body, folder);

    res.status(201).json({});
  } else {
    res.status(401);
  }
}
