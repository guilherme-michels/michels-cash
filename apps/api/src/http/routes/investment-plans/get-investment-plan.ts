import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getInvestmentPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investment-plans/:id',
      {
        schema: {
          tags: ['Investment Plans'],
          summary: 'Get an investment plan by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            200: z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              interestRate: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
              investmentGroup: z.object({
                id: z.string().uuid(),
                name: z.string(),
              }),
            }),
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
          include: {
            investmentGroup: true,
          },
        })

        if (!investmentPlan) {
          reply.status(404).send({ message: 'Investment Plan not found' })
          return
        }

        return {
          id: investmentPlan.id,
          name: investmentPlan.name,
          description: investmentPlan.description,
          interestRate: investmentPlan.interestRate,
          createdAt: investmentPlan.createdAt,
          updatedAt: investmentPlan.updatedAt,
          investmentGroup: {
            id: investmentPlan.investmentGroup.id,
            name: investmentPlan.investmentGroup.name,
          },
        }
      }
    )
}
