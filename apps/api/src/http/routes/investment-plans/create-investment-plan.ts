import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function createInvestmentPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/investment-plans',
      {
        schema: {
          tags: ['Investment Plans'],
          summary: 'Create a new investment plan',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
            interestRate: z.number(),
            investmentGroupId: z.string().uuid(),
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              interestRate: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
              investmentGroupId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { name, description, interestRate, investmentGroupId } =
          request.body

        const investmentPlan = await prisma.investmentPlan.create({
          data: {
            name,
            description,
            interestRate,
            investmentGroupId,
          },
          select: {
            id: true,
            name: true,
            description: true,
            interestRate: true,
            createdAt: true,
            updatedAt: true,
            investmentGroupId: true,
          },
        })

        reply.status(201).send(investmentPlan)
      }
    )
}
