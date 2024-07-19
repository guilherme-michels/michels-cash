import { roleSchema } from '@mcash/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-errors'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments/:investmentId/members',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get all members for a specific investment',
          security: [{ bearerAuth: [] }],
          params: z.object({
            investmentId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  userId: z.string().uuid(),
                  role: roleSchema,
                  name: z.string().nullable(),
                  email: z.string().email(),
                  avatarUrl: z.string().url().nullable(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { investmentId } = request.params
        const userId = await request.getCurrentUserId()

        const { membership } =
          await request.getUserInvestmentsMembership(investmentId)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to see members of this investment.`
          )
        }

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            investmentId,
          },
          orderBy: {
            role: 'asc',
          },
        })

        const membersWithRoles = members.map(
          ({ user: { id: userId, ...user }, ...member }) => {
            return {
              ...user,
              ...member,
              userId,
            }
          }
        )

        return reply.send({ members: membersWithRoles })
      }
    )
}
