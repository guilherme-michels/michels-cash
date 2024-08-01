import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getUserInvestments(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Get all investments for the current user',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              investments: z.array(
                z.object({
                  id: z.string().uuid().optional(),
                  amount: z.number(),
                  createdAt: z.date().optional(),
                  updatedAt: z.date().optional(),
                  ownerId: z.string().uuid(),
                  investmentPlanId: z.string().uuid(),
                })
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()

        const investments = await prisma.investment.findMany({
          where: {
            ownerId: userId,
          },
          select: {
            id: true,
            amount: true,
            createdAt: true,
            updatedAt: true,
            ownerId: true,
            investmentPlanId: true,
          },
        })

        return { investments }
      }
    )
}
