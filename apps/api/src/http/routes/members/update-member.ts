import { roleSchema } from '@mcash/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-errors'

export async function updateMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/investments/:investmentId/members/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Update a member',
          security: [{ bearerAuth: [] }],
          params: z.object({
            investmentId: z.string().uuid(),
            memberId: z.string().uuid(),
          }),
          body: z.object({
            role: roleSchema,
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { investmentId, memberId } = request.params
        const userId = await request.getCurrentUserId()

        const { membership } =
          await request.getUserInvestmentsMembership(investmentId)
        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('update', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to update this member.`
          )
        }

        const { role } = request.body

        await prisma.member.update({
          where: {
            id: memberId,
            investmentId,
          },
          data: {
            role,
          },
        })

        return reply.status(204).send()
      }
    )
}
