import { FastifyInstance } from 'fastify'

import { createInvestmentGroup } from './create-investment-group'
import { deleteInvestmentGroup } from './delete-investment-group'
import { getInvestmentGroup } from './get-investment-group'
import { getInvestmentGroups } from './get-investment-groups'
import { updateInvestmentGroup } from './update-investment-group'

export async function registerInvestmentGroupsRoutes(app: FastifyInstance) {
  await app.register(getInvestmentGroups)
  await app.register(createInvestmentGroup)
  await app.register(deleteInvestmentGroup)
  await app.register(getInvestmentGroup)
  await app.register(updateInvestmentGroup)
}
