import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './services/auth/auth.helper'
import authService from './services/auth/auth.service'
import { ITokenInside } from './services/auth/auth.types'
import { UserRole } from './types'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	// /admin
	const isAdminPage = request.url.includes('/')

	if (!refreshToken) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return redirectToLogin(isAdminPage, request)
	}

	if (!accessToken) {
		try {
			const data = await authService.getNewTokensByRefresh(refreshToken)
			accessToken = data.accessToken
		} catch (error) {
			// if (isAxiosError(error)) {
			// 	if (error.message === 'invalid token') {
			// 		console.log('не валидный токен')
			// 		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
			// 		return redirectToLogin(isAdminPage, request)
			// 	}
			// }

			request.cookies.delete(EnumTokens.ACCESS_TOKEN)
			return redirectToLogin(isAdminPage, request)
		}
	}

	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		if (payload?.role === UserRole.Admin) return NextResponse.next()

		if (isAdminPage) {
			// console.log('Нет доступа к административной странице')
			return NextResponse.redirect(new URL('/404', request.url))
		}

		return NextResponse.next()
	} catch (error) {
		// Обработка ошибок, связанных с верификацией JWT
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			// Токен истек
			console.log('Токен истек')
			return redirectToLogin(isAdminPage, request)
		}

		console.log('Ошибка при верификации токена: ', error)
		return redirectToLogin(isAdminPage, request)
	}
}

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*']
}

const redirectToLogin = (isAdminPage: boolean, request: NextRequest) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? '/404' : '/login', request.url)
	)
}
