'use client'
import { Loader } from '@/components/ui/loader/Loader'
import { useProfile } from '@/hooks/useProfile'
import { ProfileInfo } from './admin/ProfileInfo'
import { MainChart } from './admin/charts/MainChart'
import { Numbers } from './admin/charts/Numbers'
import { RadarChart } from './admin/charts/RadarChart'
import { ManageUsers } from './admin/users/ManageUsers'

export default function Home() {
	const { user, isLoading } = useProfile()

	return isLoading ? (
		<div className="w-screen h-screen flex items-center justify-center">
			<Loader />
		</div>
	) : (
		<main className="min-h-screen p-6">
			<ProfileInfo />

			{!user.isAdmin ? (
				'You are not an admin'
			) : (
				<>
					<MainChart />
					<Numbers />
					<div>
						<RadarChart />
						<ManageUsers />
					</div>
				</>
			)}
		</main>
	)
}
