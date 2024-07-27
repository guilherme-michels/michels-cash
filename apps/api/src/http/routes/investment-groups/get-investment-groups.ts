import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

const investmentTypeEnum = z.enum([
  'FIXED_INCOME',
  'REAL_ESTATE_FUND',
  'STOCKS',
  'MUTUAL_FUNDS',
])

export async function getInvestmentGroups(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investment-groups',
      {
        schema: {
          tags: ['Investment Groups'],
          summary: 'Get all investment groups',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              investmentGroups: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  type: investmentTypeEnum,
                  investmentPlans: z
                    .array(
                      z.object({
                        id: z.string(),
                        name: z.string(),
                        description: z.string(),
                        interestRate: z.number(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        investmentGroupId: z.string(),
                      })
                    )
                    .optional(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            }),
          },
        },
      },
      async () => {
        const investmentGroups = await prisma.investmentGroup.findMany({
          select: {
            id: true,
            name: true,
            type: true,
            createdAt: true,
            updatedAt: true,
            investmentPlans: {
              select: {
                id: true,
                name: true,
                description: true,
                interestRate: true,
                createdAt: true,
                updatedAt: true,
                investmentGroupId: true,
              },
            },
          },
        })

        console.log('Retrieved Investment Groups:', investmentGroups)

        return {
          investmentGroups: investmentGroups.map((group) => ({
            ...group,
            investmentPlans: group.investmentPlans || [],
          })),
        }
      }
    )
}
