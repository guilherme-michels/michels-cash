import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors'
import { prisma } from '@/lib/prisma'

export async function getTransactions(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/transactions',
      {
        schema: {
          tags: ['Transactions'],
          summary: 'Get all transactions by the logged-in user',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.array(
              z.object({
                id: z.string().uuid(),
                amount: z.number(),
                type: z.string(),
                currency: z.string(),
                description: z.string().optional(),
                createdAt: z.date(),
                senderId: z.string().uuid(),
                recipientId: z.string().uuid().nullable(),
              })
            ),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
          throw new UnauthorizedError('User not authenticated.')
        }

        const transactions = await prisma.transaction.findMany({
          where: {
            OR: [{ senderId: userId }, { recipientId: userId }],
          },
          select: {
            id: true,
            amount: true,
            type: true,
            currency: true,
            description: true,
            createdAt: true,
            senderId: true,
            recipientId: true,
          },
        })

        return reply.status(200).send(transactions)
      }
    )
}
