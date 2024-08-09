import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors'
import { prisma } from '@/lib/prisma'

export async function getTransaction(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/transactions/:transactionId',
      {
        schema: {
          tags: ['Transactions'],
          summary: 'Get a specific transaction by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            transactionId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              id: z.string().uuid(),
              amount: z.number(),
              type: z.string(),
              currency: z.string(),
              description: z.string().optional(),
              createdAt: z.date(),
              senderId: z.string().uuid(),
              recipientId: z.string().uuid().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { transactionId } = request.params
        const userId = await request.getCurrentUserId()

        const transaction = await prisma.transaction.findUnique({
          where: {
            id: transactionId,
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

        if (!transaction) {
          throw new BadRequestError('Transaction not found.')
        }

        if (
          transaction.senderId !== userId &&
          transaction.recipientId !== userId
        ) {
          throw new UnauthorizedError(
            `You're not allowed to access this transaction.`
          )
        }

        return reply.status(200).send(transaction)
      }
    )
}
