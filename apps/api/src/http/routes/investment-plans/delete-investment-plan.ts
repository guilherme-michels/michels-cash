import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function deleteInvestmentPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/investment-plans/:id',
      {
        schema: {
          tags: ['Investment Plans'],
          summary: 'Delete an investment plan by ID',
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

        const investmentPlan = await prisma.investmentPlan.findUnique({
          where: { id },
        })

        if (!investmentPlan) {
          reply.status(404).send({ message: 'Investment Plan not found' })
          return
        }

        await prisma.investmentPlan.delete({
          where: { id },
        })

        reply.status(204).send()
      }
    )
}
