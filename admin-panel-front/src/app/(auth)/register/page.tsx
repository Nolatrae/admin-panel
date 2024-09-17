import type { Metadata } from 'next'
import { AuthForm } from '../AuthForm'

export const metadata: Metadata = {
	title: 'Register'
}

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-950">
			<div className="bg-neutral-900 p-8 rounded-lg shadow-md">
				<h2 className="font-semibold mb-4">Регистрация</h2>
				<AuthForm isLogin={false} />
			</div>
		</div>
	)
}
