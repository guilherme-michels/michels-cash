import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { investmentPlanSchema } from '../investment-plans/_investment-plan.schema'

export async function getUserInvestmentsByGroupId(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments/group/:groupId',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Get all investments for the current user by group ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            groupId: z.string().uuid(),
          }),
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
                  investmentPlan: investmentPlanSchema,
                })
              ),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { groupId } = request.params

        const investments = await prisma.investment.findMany({
          where: {
            ownerId: userId,
            investmentPlan: {
              investmentGroupId: groupId,
            },
          },
          select: {
            id: true,
            amount: true,
            createdAt: true,
            updatedAt: true,
            ownerId: true,
            investmentPlanId: true,
            investmentPlan: true,
          },
        })

        if (investments.length === 0) {
          reply.status(404).send({
            message: 'No investments found for the specified group ID',
          })
          return
        }

        reply.send({ investments })
      }
    )
}
