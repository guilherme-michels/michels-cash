import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can }) {
    can('manage', ['all'])
  },
  MEMBER(user, { can }) {
    can('get', 'User')

    can('create', 'Transaction')
    can('get', 'Transaction')
    can('manage', 'Transaction')
    can('delete', 'Transaction')

    can('get', 'InvestmentPlan')

    can('get', 'Investment')
    can('create', 'Investment')
    can('manage', 'Investment')
    can('delete', 'Investment')

    can('create', 'Invite')
    can('get', 'Invite')
    can('delete', 'Invite')
  },
}
