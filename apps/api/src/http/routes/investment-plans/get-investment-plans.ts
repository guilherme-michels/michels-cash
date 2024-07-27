import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getInvestmentPlans(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investment-plans',
      {
        schema: {
          tags: ['Investment Plans'],
          summary: 'Get all investment plans',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              investmentPlans: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  description: z.string(),
                  interestRate: z.number(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            }),
          },
        },
      },
      async () => {
        const investmentPlans = await prisma.investmentPlan.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            interestRate: true,
            createdAt: true,
            updatedAt: true,
          },
        })

        return { investmentPlans }
      }
    )
}
