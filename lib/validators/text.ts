import { z } from "zod";

export const TextValidator = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

export type TextSimilarityRequest = z.infer<typeof TextValidator>;
