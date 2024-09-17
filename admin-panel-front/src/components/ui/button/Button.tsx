import cn from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant: 'primary' | 'secondary' | 'disabled'
	isCircle?: boolean
}

export function Button({
	children,
	variant = 'primary',
	isCircle,
	className,
	...rest
}: Props) {
	return (
		<button
			className={cn(
				styles.button,
				styles[variant],
				{
					[styles.circle]: isCircle,
				},
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
