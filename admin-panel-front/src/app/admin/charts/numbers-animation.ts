import { MotionProps } from 'framer-motion'

export const ROTATE_CARD: MotionProps = {
	initial: {
		rotate: 0,
	},
	whileHover: {
		rotateX: 10,
		rotateY: -8,
		x: 31,
		y: -23,
		z: 0,
		boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1)',
	},
	transition: {
		type: 'spring',
		duration: 0.8,
		bounce: 0.4,
		damping: 9,
	},
}

export const itemVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
}

export const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
}
