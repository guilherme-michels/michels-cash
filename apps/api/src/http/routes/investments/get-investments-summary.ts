import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getUserInvestmentsSummary(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investments/summary',
      {
        schema: {
          tags: ['Investments'],
          summary: 'Get investments summary for the current user',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              totalInvestment: z.number(),
              investmentGroups: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  description: z.string().optional(),
                  totalAmount: z.number(),
                  percentage: z.number(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        console.log('Request Headers:', request.headers)
        console.log('Request Body:', request.body)

        try {
          const userId = await request.getCurrentUserId()

          const investments = await prisma.investment.findMany({
            where: { ownerId: userId },
            include: {
              investmentPlan: {
                include: {
                  investmentGroup: true,
                },
              },
            },
          })

          console.log('Investments:', investments)

          if (investments.length === 0) {
            return { totalInvestment: 0, investmentGroups: [] }
          }

          const totalInvestment = investments.reduce(
            (total, investment) => total + investment.amount,
            0
          )

          const investmentGroupsMap = investments.reduce(
            (groups, investment) => {
              const group = investment.investmentPlan.investmentGroup
              if (!group) return groups
              if (!groups[group.id]) {
                groups[group.id] = { ...group, totalAmount: 0 }
              }
              groups[group.id].totalAmount += investment.amount
              return groups
            },
            {} as Record<
              string,
              {
                id: string
                name: string
                totalAmount: number
              }
            >
          )

          const investmentGroups = Object.values(investmentGroupsMap).map(
            (group) => {
              const percentage =
                totalInvestment === 0
                  ? 0
                  : (group.totalAmount / totalInvestment) * 100
              return {
                ...group,
                percentage: parseFloat(percentage.toFixed(2)),
              }
            }
          )

          return { totalInvestment, investmentGroups }
        } catch (error) {
          console.error('Error fetching investments summary:', error)
          return reply.status(500).send()
        }
      }
    )
}
