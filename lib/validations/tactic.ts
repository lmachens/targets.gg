import z from 'zod';

export const tacticPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.nullable(z.string()).optional(),
});
