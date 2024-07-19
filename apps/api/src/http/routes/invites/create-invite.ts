import { roleSchema } from '@mcash/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../_errors/unauthorized-errors'

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/investments/:investmentId/invites',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Create a new invite for investment',
          security: [{ bearerAuth: [] }],
          body: z.object({
            email: z.string().email(),
            role: roleSchema,
          }),
          params: z.object({
            investmentId: z.string().uuid(),
          }),
          response: {
            201: z.object({
              inviteId: z.string().uuid(),
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
          include: {
            owner: true,
          },
        })

        if (!investment) {
          throw new BadRequestError('Investment not found.')
        }

        if (investment.ownerId !== userId) {
          throw new UnauthorizedError(
            `You're not allowed to create invites for this investment.`
          )
        }

        const { email, role } = request.body

        const inviteWithSameEmail = await prisma.invite.findUnique({
          where: {
            email_investmentId: {
              email,
              investmentId: investment.id,
            },
          },
        })

        if (inviteWithSameEmail) {
          throw new BadRequestError(
            'Another invite with the same email already exists.'
          )
        }

        const memberWithSameEmail = await prisma.familyMember.findFirst({
          where: {
            investmentId: investment.id,
            user: {
              email,
            },
          },
        })

        if (memberWithSameEmail) {
          throw new BadRequestError(
            'A member with this email already belongs to your investment.'
          )
        }

        const invite = await prisma.invite.create({
          data: {
            investmentId: investment.id,
            email,
            role,
            authorId: userId,
          },
        })

        return reply.status(201).send({
          inviteId: invite.id,
        })
      }
    )
}
