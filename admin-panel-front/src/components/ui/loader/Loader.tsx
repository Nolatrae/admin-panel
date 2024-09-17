import { m } from 'framer-motion'

export function Loader() {
	return (
		<m.svg
			xmlns='http://www.w3.org/2000/svg'
			width='64'
			height='64'
			viewBox='0 0 64 64'
			fill='none'
			animate={{ rotate: 360 }}
			transition={{ repeat: Infinity, duration: 1.3, ease: 'linear' }}
		>
			<m.circle
				cx='32'
				cy='32'
				r='28'
				stroke='#FEFEFE'
				strokeWidth='8'
				initial={{ opacity: 0.5 }}
				animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
				transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
			/>
			<m.circle
				cx='32'
				cy='32'
				r='14'
				stroke='#FFAD51'
				strokeWidth='8'
				initial={{ scale: 1 }}
				animate={{ scale: [1, 1.1, 1] }}
				transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
			/>
		</m.svg>
	)
}
