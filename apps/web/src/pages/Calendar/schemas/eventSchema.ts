import { z } from 'zod'

import { patientSchema } from '../../Patient/schemas/patientSchema'
import { userSchema } from '../../Settings/schemas/userSchema'

export const eventSchema = z.object({
  id: z.number().nullable().optional(),
  allDay: z.boolean().optional(),
  title: z.string().nullable().optional(),
  start: z.date().optional(),
  end: z.date().optional(),
  resource: z.any().optional(),
  patientId: z.string({
    required_error: 'Preencha este campo',
  }),
  patient: patientSchema.nullable().optional(),
  userId: z.string({
    required_error: 'Preencha este campo',
  }),
  user: userSchema.nullable().optional(),
  description: z.string({
    required_error: 'Preencha este campo',
  }),
})

export type EventData = z.infer<typeof eventSchema>
