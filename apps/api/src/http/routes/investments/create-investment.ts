import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors'
import { prisma } from '@/lib/prisma'

export async function createInvestment(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/investments',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Create a new investment',
          security: [{ bearerAuth: [] }],
          body: z.object({
            amount: z.number().positive(),
            investmentPlanId: z.string().uuid(),
          }),
          response: {
            201: z.object({
              investmentId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
          throw new UnauthorizedError('User not authenticated.')
        }

        const { amount, investmentPlanId } = request.body

        const investmentPlan = await prisma.investmentPlan.findUnique({
          where: {
            id: investmentPlanId,
          },
        })

        if (!investmentPlan) {
          throw new BadRequestError('Investment Plan not found.')
        }

        const investment = await prisma.investment.create({
          data: {
            amount,
            investmentPlanId,
            ownerId: userId,
          },
        })

        return reply.status(201).send({
          investmentId: investment.id,
        })
      }
    )
}
