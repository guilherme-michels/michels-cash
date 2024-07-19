import { z } from 'zod'

import { investmentSchema } from '../models/investment'

export const investmentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Investment'), investmentSchema]),
])

export type InvestmentSubject = z.infer<typeof investmentSubject>
