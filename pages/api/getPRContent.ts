import type { NextApiRequest, NextApiResponse } from "next";

import { getPRContent } from "../../lib/git";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const PRContent = await getPRContent(parseInt(req.query.id as string));

    res.status(200).json(PRContent);
  } else {
    res.status(401);
  }
}