import { z } from 'zod'

export const investmentSchema = z.object({
  __typename: z.literal('Investment').default('Investment'),
  id: z.string(),
  ownerId: z.string(),
})

export type Investment = z.infer<typeof investmentSchema>
