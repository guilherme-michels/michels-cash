import { FastifyInstance } from 'fastify'

import { authenticateWithPassword } from './authenticate-with-password'
import { createAccount } from './create-account'
import { getProfile } from './get-profile'
import { requestPasswordRecover } from './request-password-recover'
import { resetPassword } from './reset-password'

export async function registerAuthRoutes(app: FastifyInstance) {
  await app.register(createAccount)
  await app.register(authenticateWithPassword)
  await app.register(getProfile)
  await app.register(requestPasswordRecover)
  await app.register(resetPassword)
}
