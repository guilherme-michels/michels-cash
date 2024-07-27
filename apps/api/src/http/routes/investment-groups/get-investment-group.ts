import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getInvestmentGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investment-groups/:id',
      {
        schema: {
          tags: ['Investment Groups'],
          summary: 'Get investment group by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            200: z
              .object({
                id: z.string().uuid(),
                name: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
              .nullable(),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const investmentGroup = await prisma.investmentGroup.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        })

        if (!investmentGroup) {
          reply.status(404).send({ message: 'Investment group not found' })
          return
        }

        reply.send(investmentGroup)
      }
    )
}
