import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors'
import { prisma } from '@/lib/prisma'

export async function deleteInvestment(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/investments/:investmentId',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Delete a specific investment by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            investmentId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
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
        })

        if (!investment) {
          throw new BadRequestError('Investment not found.')
        }

        if (investment.ownerId !== userId) {
          throw new UnauthorizedError(
            `You're not allowed to delete this investment.`
          )
        }

        await prisma.investment.delete({
          where: {
            id: investmentId,
          },
        })

        return reply.status(204).send(null)
      }
    )
}
