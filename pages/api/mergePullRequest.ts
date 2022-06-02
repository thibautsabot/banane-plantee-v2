import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { mergePullRequest } from "../../lib/git";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const merge = await mergePullRequest(parseInt(req.query.id as string));

    res.status(200).json(merge);
  } else {
    res.status(401);
  }
}