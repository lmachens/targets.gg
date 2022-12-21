import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';
import { unstable_getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import withMethods from 'lib/middlewares/withMethods';
import { authOptions } from 'lib/auth';

const tacticCreateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  const { user } = session;

  if (req.method === 'GET') {
    try {
      const tactics = await db.tactic.findMany({
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
        where: {
          authorId: user.id,
        },
      });

      return res.json(tactics);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === 'POST') {
    try {
      const body = tacticCreateSchema.parse(req.body);

      const tactic = await db.tactic.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      return res.json(tactic);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(['GET', 'POST'], handler);
