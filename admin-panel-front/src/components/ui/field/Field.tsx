import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './Field.module.scss'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	extra?: string
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, extra, ...rest }, ref) => {
		return (
			<div className={`${extra}`}>
				<label className='text-gray-50/40'>
					{label}
					<input ref={ref} className={styles['input-field']} {...rest} />
				</label>
			</div>
		)
	}
)

Field.displayName = 'field'
