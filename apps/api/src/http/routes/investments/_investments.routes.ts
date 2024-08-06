import { FastifyInstance } from 'fastify'

import { createInvestment } from './create-investment'
import { deleteInvestment } from './delete-investment'
import { getInvestment } from './get-investment'
import { getUserInvestments } from './get-investments'
import { getUserInvestmentsByGroupId } from './get-investments-by-group'
import { getUserInvestmentsSummary } from './get-investments-summary'
import { updateInvestment } from './update-investment'

export async function registerInvestmentsRoutes(app: FastifyInstance) {
  await app.register(getUserInvestments)
  await app.register(getInvestment)
  await app.register(updateInvestment)
  await app.register(createInvestment)
  await app.register(deleteInvestment)
  await app.register(getUserInvestmentsSummary)
  await app.register(getUserInvestmentsByGroupId)
}
