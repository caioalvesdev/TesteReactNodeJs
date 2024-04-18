import { z } from 'zod';

export const requestBodySchema = z.object({
  firstValue: z.number(),
  secondValue: z.number(),
  operation: z.enum(["sum", "sub", "divide", "multiple"])
})