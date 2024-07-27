import { FastifyInstance } from 'fastify'

import { createInvestmentPlan } from './create-investment-plan'
import { deleteInvestmentPlan } from './delete-investment-plan'
import { getInvestmentPlan } from './get-investment-plan'
import { getInvestmentPlans } from './get-investment-plans'
import { updateInvestmentPlan } from './update-investment-plan'

export async function registerInvestmentPlansRoutes(app: FastifyInstance) {
  await app.register(getInvestmentPlans)
  await app.register(getInvestmentPlan)
  await app.register(deleteInvestmentPlan)
  await app.register(createInvestmentPlan)
  await app.register(updateInvestmentPlan)
}
