import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function updateInvestmentGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/investment-groups/:id',
      {
        schema: {
          tags: ['Investment Groups'],
          summary: 'Update investment group by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          body: z.object({
            name: z.string().optional(),
          }),
          response: {
            200: z.object({
              id: z.string().uuid(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const { name } = request.body

        const investmentGroup = await prisma.investmentGroup.update({
          where: { id },
          data: {
            name,
          },
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        })

        reply.send(investmentGroup)
      }
    )
}
