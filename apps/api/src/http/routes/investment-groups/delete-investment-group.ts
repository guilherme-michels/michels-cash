import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function deleteInvestmentGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/investment-groups/:id',
      {
        schema: {
          tags: ['Investment Groups'],
          summary: 'Delete an investment group by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            204: z.null(),
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
        })

        if (!investmentGroup) {
          reply.status(404).send({ message: 'Investment group not found' })
          return
        }

        await prisma.investmentGroup.delete({
          where: { id },
        })

        reply.status(204).send()
      }
    )
}
