import { roleSchema } from '@mcash/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-errors'

export async function getInvites(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments/:investmentId/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get all investment invites',
          security: [{ bearerAuth: [] }],
          params: z.object({
            investmentId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: roleSchema,
                  email: z.string().email(),
                  createdAt: z.date(),
                  author: z
                    .object({
                      id: z.string().uuid(),
                      name: z.string().nullable(),
                    })
                    .nullable(),
                })
              ),
            }),
          },
        },
      },
      async (request) => {
        const { investmentId } = request.params
        const userId = await request.getCurrentUserId()

        const investment = await prisma.investment.findUnique({
          where: {
            id: investmentId,
          },
          include: {
            owner: true,
          },
        })

        if (!investment) {
          throw new UnauthorizedError('Investment not found.')
        }

        const { cannot } = getUserPermissions(userId, investment.owner.id)

        if (cannot('get', 'Invite')) {
          throw new UnauthorizedError(
            `You're not allowed to get investment invites.`
          )
        }

        const invites = await prisma.invite.findMany({
          where: {
            investmentId: investment.id,
          },
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        return { invites }
      }
    )
}
