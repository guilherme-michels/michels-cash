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
                  id: z.string().uuid(),
                  name: z.string(),
                  description: z.string().nullable(),
                  createdAt: z.date(),
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
            members: {
              some: {
                userId,
              },
            },
          },
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
          },
        })

        return { investments }
      }
    )
}
