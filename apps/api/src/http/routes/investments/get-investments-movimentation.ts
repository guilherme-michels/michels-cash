import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getInvestmentsMovimentationByGroupId(
  app: FastifyInstance
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments-movimentation/group/:groupId',
      {
        schema: {
          tags: ['Investments'],
          summary:
            'Get investment movimentation for the current user by group ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            groupId: z.string().uuid(),
          }),
          querystring: z.object({
            rangeDays: z
              .string()
              .optional()
              .transform((value) => parseInt(value!, 10))
              .refine((value) => !isNaN(value), {
                message: 'rangeDays must be a valid number',
              }),
          }),
          response: {
            200: z.object({
              movimentations: z.array(
                z.object({
                  amount: z.number(),
                  createdAt: z.date(),
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
        const { rangeDays } = request.query

        const dateCutoff = rangeDays
          ? new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000)
          : undefined

        const movimentations = await prisma.investment.findMany({
          where: {
            ownerId: userId,
            investmentPlan: {
              investmentGroupId: groupId,
            },
            createdAt: dateCutoff ? { gte: dateCutoff } : undefined,
          },
          select: {
            amount: true,
            createdAt: true,
          },
        })

        if (movimentations.length === 0) {
          reply.status(404).send({
            message:
              'No investment movimentations found for the specified group ID',
          })
          return
        }

        reply.send({ movimentations })
      }
    )
}
