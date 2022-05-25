import type { NextApiRequest, NextApiResponse } from "next";

import fs from "node:fs";
import path from "node:path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const folder = path.join(process.cwd() + `/public/assets/blog/${body.slug}`);
  const base64Data = body.file.replace(/^data:image\/png;base64,/, "");

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fs.writeFileSync(path.join(`${folder}/${body.name}`), base64Data, "base64");

  res.status(201).json({});
}
