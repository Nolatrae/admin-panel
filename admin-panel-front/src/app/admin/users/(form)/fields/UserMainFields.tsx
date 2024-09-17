import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Field } from '@/components/ui/field/Field'
import type { IUserFormState } from '../user-form.types'

const validEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function UserMainFields({
	errors,
	register,
}: {
	errors: FieldErrors<IUserFormState>
	register: UseFormRegister<IUserFormState>
}) {
	return (
		<div className='grid min-lg:grid-cols-2 gap-5'>
			<Field
				{...register('email', {
					required: 'Email is required field!',
					pattern: {
						value: validEmail,
						message: 'Пожалуйста введите валидный Email',
					},
				})}
				placeholder='Email'
				autoComplete='none'
			/>
			<Field {...register('password')} placeholder='Password' type='password' />
		</div>
	)
}
