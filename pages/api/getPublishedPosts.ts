import type { NextApiRequest, NextApiResponse } from "next";

import fs from 'node:fs'
import { getSession } from "next-auth/react";
import path from 'node:path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const filesPaths = fs
    .readdirSync(path.join(process.cwd() + `/posts`))

    res.status(200).json(filesPaths);
  } else {
    res.status(401);
  }
}