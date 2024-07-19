import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'
import { investmentSubject } from './subjects/investment'
import { investmentPlanSubject } from './subjects/investmentPlan'
import { inviteSubject } from './subjects/invite'
import { transactionSubject } from './subjects/transaction'
import { userSubject } from './subjects/user'

export * from './models/investment'
export * from './models/user'
export * from './roles'

const appAbilitiesSchema = z.union([
  investmentPlanSubject,
  investmentSubject,
  transactionSubject,
  userSubject,
  inviteSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
