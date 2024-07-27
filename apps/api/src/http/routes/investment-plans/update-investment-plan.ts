import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function updateInvestmentPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/investment-plans/:id',
      {
        schema: {
          tags: ['Investment Plans'],
          summary: 'Update an investment plan by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          body: z.object({
            name: z.string(),
            description: z.string(),
            interestRate: z.number(),
            investmentGroupId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              interestRate: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
              investmentGroup: z.object({
                id: z.string().uuid(),
                name: z.string(),
              }),
            }),
            404: z.object({
              message: z.string(),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request) => {
        const { id } = request.params
        const { name, description, interestRate, investmentGroupId } =
          request.body

        const investmentPlan = await prisma.investmentPlan.update({
          where: { id },
          data: {
            name,
            description,
            interestRate,
            investmentGroup: {
              connect: { id: investmentGroupId },
            },
          },
          include: {
            investmentGroup: true,
          },
        })

        return {
          id: investmentPlan.id,
          name: investmentPlan.name,
          description: investmentPlan.description,
          interestRate: investmentPlan.interestRate,
          createdAt: investmentPlan.createdAt,
          updatedAt: investmentPlan.updatedAt,
          investmentGroup: {
            id: investmentPlan.investmentGroup.id,
            name: investmentPlan.investmentGroup.name,
          },
        }
      }
    )
}
