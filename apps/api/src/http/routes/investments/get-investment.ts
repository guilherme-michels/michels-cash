import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors'
import { prisma } from '@/lib/prisma'

export async function getInvestment(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments/:investmentId',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Get a specific investment by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            investmentId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              id: z.string().uuid().optional(),
              amount: z.number(),
              createdAt: z.date().optional(),
              updatedAt: z.date().optional(),
              ownerId: z.string().uuid(),
              investmentPlanId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { investmentId } = request.params
        const userId = await request.getCurrentUserId()

        const investment = await prisma.investment.findUnique({
          where: {
            id: investmentId,
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

        if (!investment) {
          throw new BadRequestError('Investment not found.')
        }

        if (investment.ownerId !== userId) {
          throw new UnauthorizedError(
            `You're not allowed to access this investment.`
          )
        }

        return reply.status(200).send(investment)
      }
    )
}
