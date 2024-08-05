import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { InvestmentRiskLevel } from './_investment-plan.schema'

export async function getInvestmentPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/investment-plans/:id',
      {
        schema: {
          tags: ['Investment Plans'],
          summary: 'Get an investment plan by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            200: z.object({
              investmentPlan: z.object({
                id: z.string().uuid(),
                name: z.string(),
                description: z.string(),
                interestRate: z.number(),
                riskLevel: InvestmentRiskLevel,
                minimumInvestmentAmount: z.number().optional(),
                maximumInvestmentAmount: z.number().optional(),
                duration: z.number().int(),
                liquidity: z.date(),
                penaltyForEarlyWithdrawal: z.number().nonnegative().optional(),
                currency: z.string(),
                maturityDate: z.date(),
                investmentGroupId: z.string().uuid(),
              }),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const investmentPlan = await prisma.investmentPlan.findUnique({
          where: { id },
          include: {
            investmentGroup: true,
          },
        })

        if (!investmentPlan) {
          reply.status(404).send({ message: 'Investment Plan not found' })
          return
        }

        reply.send({
          investmentPlan: {
            id: investmentPlan.id,
            name: investmentPlan.name,
            description: investmentPlan.description,
            interestRate: investmentPlan.interestRate,
            minimumInvestmentAmount: investmentPlan.minimumInvestmentAmount,
            maximumInvestmentAmount: investmentPlan.maximumInvestmentAmount,
            riskLevel: investmentPlan.riskLevel,
            duration: investmentPlan.duration,
            liquidity: investmentPlan.liquidity,
            penaltyForEarlyWithdrawal: investmentPlan.penaltyForEarlyWithdrawal,
            currency: investmentPlan.currency,
            maturityDate: investmentPlan.maturityDate,
            investmentGroupId: investmentPlan.investmentGroupId,
          },
        })
      }
    )
}
