'use client'

import { UserEditingForm } from './UserEditingForm'
import { useUserQueries } from './useUserQueries'
import { type IUserForm } from './user-form.types'

export function UserForm({ type, id }: Pick<IUserForm, 'id' | 'type'>) {
	const result = useUserQueries(id, type === 'create')

	return <UserEditingForm queriesResult={result} type={type} id={id} />
}
