import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { listPullRequests } from "../../lib/git";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const pulls = await listPullRequests(req.query.id as string | undefined);

    res.status(200).json(pulls);
  } else {
    res.status(401);
  }
}