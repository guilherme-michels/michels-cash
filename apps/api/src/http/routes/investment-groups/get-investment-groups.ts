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

const investmentRiskLevelEnum = z.enum(['LOW', 'MEDIUM', 'HIGH'])

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
          querystring: z.object({
            type: investmentTypeEnum.optional(),
            risk: z
              .union([
                investmentRiskLevelEnum,
                z.array(investmentRiskLevelEnum),
              ])
              .optional(),
          }),
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
                        riskLevel: investmentRiskLevelEnum,
                        minimumInvestmentAmount: z.number().optional(),
                        maturityDate: z.date(),
                        liquidity: z.date(),
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
      async (request) => {
        const { type, risk } = request.query as {
          type?: typeof investmentTypeEnum._type
          risk?:
            | typeof investmentRiskLevelEnum._type
            | (typeof investmentRiskLevelEnum._type)[]
        }

        const riskLevels = Array.isArray(risk) ? risk : risk ? [risk] : []

        const investmentGroups = await prisma.investmentGroup.findMany({
          where: {
            type: type || undefined,
            investmentPlans:
              riskLevels.length > 0
                ? {
                    some: {
                      riskLevel: {
                        in: riskLevels,
                      },
                    },
                  }
                : undefined,
          },
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
                minimumInvestmentAmount: true,
                maturityDate: true,
                liquidity: true,
                riskLevel: true,
                createdAt: true,
                updatedAt: true,
                investmentGroupId: true,
              },
              where: {
                riskLevel: {
                  in: riskLevels.length > 0 ? riskLevels : undefined,
                },
              },
            },
          },
        })

        return {
          investmentGroups: investmentGroups.map((group) => ({
            ...group,
            investmentPlans: group.investmentPlans || [],
          })),
        }
      }
    )
}
