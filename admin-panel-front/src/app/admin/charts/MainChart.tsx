import { Loader } from '@/components/ui/loader/Loader'
import { COLORS } from '@/constants/color.constants'
import statisticsService from '@/services/statistics.service'
import { useQuery } from '@tanstack/react-query'
import {
	CategoryScale,
	ChartData,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
)

export const MainChart = () => {
	const { data, isPending } = useQuery({
		queryKey: ['main-chart'],
		queryFn: () => statisticsService.getRegistrationsByMonth(),
		select({ data }): ChartData<'line', number[], string> {
			return {
				labels: data.map(item => item.month),
				datasets: [
					{
						label: 'Number of registrations',
						data: data.map(item => item.count),
						borderColor: COLORS.primary,
						tension: 0.1
					}
				]
			}
		}
	})

	return isPending ? (
		<Loader />
	) : data ? (
		<Line data={data} className="mb-6" />
	) : null
}
