import type { TypeUserForm } from './user-form.types'

export function UserFormHeading({
	type,
	email,
}: {
	type: TypeUserForm
	email?: string
}) {
	switch (type) {
		case 'create':
			return 'Создание пользователя'

		case 'edit':
			return `Редактирование "${email}"`

		default:
			return 'Редактирование профиля'
	}
}
