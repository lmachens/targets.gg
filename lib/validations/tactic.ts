import z from 'zod';

export const postPatchSchema = z.object({
  gameClassId: z.number(),
  title: z.string().min(3).max(128),
  background: z.string(),
  data: z.string(),
});
