import { FastifyInstance } from 'fastify'

import { getMembers } from './get-members'
import { removeMember } from './remove-member'
import { updateMember } from './update-member'

export async function registerMembersRoutes(app: FastifyInstance) {
  await app.register(getMembers)
  await app.register(updateMember)
  await app.register(removeMember)
}
