import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';

import { db } from 'lib/db';
import withMethods from 'lib/middlewares/withMethods';
import { withTactic } from 'lib/middlewares/withTactic';
import { tacticPatchSchema } from 'lib/validations/tactic';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      await db.tactic.delete({
        where: {
          id: req.query.tacticId as string,
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === 'PATCH') {
    try {
      const tacticId = req.query.tacticId as string;
      const tactic = (await db.tactic.findUnique({
        where: {
          id: tacticId,
        },
      }))!;

      const body = tacticPatchSchema.parse(req.body);
      // TODO: Implement sanitization for content.

      await db.tactic.update({
        where: {
          id: tactic.id,
        },
        data: {
          title: body.title || tactic.title,
          content: body.content || undefined,
        },
      });

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(['DELETE', 'PATCH'], withTactic(handler));
