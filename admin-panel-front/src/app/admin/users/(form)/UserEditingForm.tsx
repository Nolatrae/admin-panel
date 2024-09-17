'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { Loader } from '@/components/ui/loader/Loader'
import Skeleton from 'react-loading-skeleton'
import { UserFormHeading } from './UserFormHeading'
import { UserMainFields } from './fields/UserMainFields'
import { UserProfileFields } from './fields/UserProfileFields'
import type { IUserForm, IUserFormState } from './user-form.types'

export function UserEditingForm({
	type,
	queriesResult: {
		onSubmit,
		data,
		initialUserLoading,
		isLoading,
		isNeedResetForm,
	},
}: IUserForm) {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
		watch,
	} = useForm<IUserFormState>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (!data) return
		if (watch('email') && type === 'edit') return

		reset({
			avatarUrl: data.avatarUrl,
			country: data.country,
			email: data.email,
			role: data.role,
		})
	}, [data])

	useEffect(() => {
		if (isNeedResetForm) reset()
	}, [isNeedResetForm, reset])

	if (initialUserLoading) return <Skeleton />

	return isLoading ? (
		<Loader />
	) : (
		<div className='p-6'>
			<h1>
				<UserFormHeading type={type} email={data?.email} />
			</h1>
			<form
				className='min-lg:mt-10 mt-5'
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				encType='multipart/form-data'
			>
				<UserMainFields errors={errors} register={register} />
				<UserProfileFields control={control} register={register} />

				<Button
					variant='primary'
					className='min-lg:mt-10 mt-5'
					disabled={isLoading}
					type='submit'
				>
					{type === 'create' ? 'Create' : 'Save'}
				</Button>
			</form>

			<Loader />
		</div>
	)
}
