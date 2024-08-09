import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors'
import { prisma } from '@/lib/prisma'

export async function createTransaction(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/transactions',
      {
        schema: {
          tags: ['Transactions'],
          summary: 'Create a new transaction',
          security: [{ bearerAuth: [] }],
          body: z.object({
            amount: z.number().positive(),
            type: z.enum(['deposit', 'withdrawal', 'transfer']),
            currency: z.string().length(3),
            description: z.string(),
            recipientId: z.string().uuid().optional(),
          }),
          response: {
            201: z.object({
              transactionId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
          throw new UnauthorizedError('User not authenticated.')
        }

        const { amount, type, currency, description, recipientId } =
          request.body

        let recipient = null
        if (type === 'transfer') {
          if (!recipientId) {
            throw new BadRequestError('Recipient ID is required for transfers.')
          }

          recipient = await prisma.user.findUnique({
            where: { id: recipientId },
          })

          if (!recipient) {
            throw new BadRequestError('Recipient not found.')
          }
        }

        const transaction = await prisma.transaction.create({
          data: {
            amount,
            type,
            currency,
            description,
            senderId: userId,
            recipientId,
          },
        })

        return reply.status(201).send({
          transactionId: transaction.id,
        })
      }
    )
}
