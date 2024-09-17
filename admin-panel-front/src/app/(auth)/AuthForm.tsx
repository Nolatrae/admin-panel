'use client'

import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { Loader } from '@/components/ui/loader/Loader'
import authService from '@/services/auth/auth.service'
import { IAuthFormData } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AuthFormProps {
	isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
	const { register, handleSubmit, reset } = useForm<IAuthFormData>()

	const router = useRouter()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFormData) => authService.main('login', data),
		onSuccess() {
			reset()
			router.push('/')
			toast.success('Login successful')
		}
	})

	const {
		error,
		mutate: mutateRegister,
		isPending: isRegisterPending
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthFormData) => authService.main('register', data),
		onSuccess() {
			reset()
			router.push('/')
			toast.success('Registration successful')
		}
	})

	const isPending = isLoginPending || isRegisterPending

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
			<Field
				extra="mb-4"
				label="Email"
				type="email"
				placeholder="Enter email: "
				{...register('email', { required: true })}
			/>

			{error && <p className="text-red-500">{error.message}</p>}

			<Field
				extra="mb-4"
				label="Пароль"
				type="password"
				placeholder="Enter password: "
				{...register('password', { required: true })}
			/>

			<div className="mb-4">
				<Button
					type="submit"
					variant={isLogin ? 'primary' : 'secondary'}
					disabled={isPending}
				>
					{isPending ? <Loader /> : isLogin ? 'Войти' : 'Зарегистрироваться'}
				</Button>
			</div>
		</form>
	)
}
