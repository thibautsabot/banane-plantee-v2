import type { NextApiRequest, NextApiResponse } from "next";

import fs from "node:fs";
import path from "node:path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const folder = path.join(process.cwd() + `/posts/`);

  fs.writeFileSync(
    path.join(`${folder}/${body.slug}.mdx`),
    body.content,
    "utf8"
  );

  res.status(201).json({});
}
