import { Loader } from '@/components/ui/loader/Loader'
import { COLORS } from '@/constants/color.constants'
import statisticsService from '@/services/statistics.service'
import { useQuery } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { AreaChart, BarChart3 } from 'lucide-react'
import {
	ROTATE_CARD,
	containerVariants,
	itemVariants
} from './numbers-animation'

export function Numbers() {
	const { data, isPending } = useQuery({
		queryKey: ['numbers'],
		queryFn: () => statisticsService.getNumbers()
	})

	return isPending ? (
		<Loader />
	) : data?.data.length ? (
		<m.div
			className="grid grid-cols-4 gap-5 mb-8"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{data.data.map((number, index) => (
				<m.div
					key={number.name}
					className="bg-gray-500 rounded-md p-5 grid grid-cols-2 gap-10"
					variants={itemVariants}
					whileHover={ROTATE_CARD.whileHover}
					transition={ROTATE_CARD.transition}
				>
					<div className="h-full">
						<div>{number.name}</div>
						<div className="font-bold">{number.value}</div>
					</div>
					<div className="flex items-end">
						{index % 2 === 0 ? (
							<AreaChart color={COLORS.primary} size={45} />
						) : (
							<BarChart3 color={COLORS.secondary} size={45} />
						)}
					</div>
				</m.div>
			))}
		</m.div>
	) : null
}
