import { FastifyInstance } from 'fastify'

import { getUserInvestments } from './get-investments'

export async function registerInvestmentsRoutes(app: FastifyInstance) {
  await app.register(getUserInvestments)
}
