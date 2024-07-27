import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function createInvestmentGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/investment-groups',
      {
        schema: {
          tags: ['Investment Groups'],
          summary: 'Create a new investment group',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { name } = request.body

        const newInvestmentGroup = await prisma.investmentGroup.create({
          data: {
            name,
          },
        })

        reply.status(201).send(newInvestmentGroup)
      }
    )
}
