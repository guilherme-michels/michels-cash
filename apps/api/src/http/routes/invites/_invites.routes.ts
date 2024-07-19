import { FastifyInstance } from 'fastify'

import { acceptInvite } from './accept-invite'
import { createInvite } from './create-invite'
import { getInvite } from './get-invite'
import { getInvites } from './get-invites'
import { getPendingInvites } from './get-pending-invites'
import { rejectInvite } from './reject-invite'
import { revokeInvite } from './revoke-invite'

export async function registerInviteRoutes(app: FastifyInstance) {
  await app.register(acceptInvite)
  await app.register(createInvite)
  await app.register(getInvite)
  await app.register(getInvites)
  await app.register(getPendingInvites)
  await app.register(rejectInvite)
  await app.register(revokeInvite)
}
