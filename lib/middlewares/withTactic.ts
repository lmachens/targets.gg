import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from 'lib/auth';
import { db } from 'lib/db';

export const schema = z.object({
  tacticId: z.string(),
});

export function withTactic(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await schema.parse(req.query);

      // Check if the user has access to this tactic.
      const session = await unstable_getServerSession(req, res, authOptions);
      const count = await db.tactic.count({
        where: {
          id: query.tacticId,
          authorId: session?.user.id,
        },
      });

      if (count < 1) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  };
}
