import { ShowMore } from '@/components/ui/ShowMore'
import { Dispatch, SetStateAction } from 'react'

interface IManageUsersShowMore {
	loading: boolean
	setPage: Dispatch<SetStateAction<number>>
}

export function ManageUsersShowMore({
	setPage,
	loading,
}: IManageUsersShowMore) {
	return (
		<ShowMore
			isLoading={loading}
			onLoadMore={() => setPage(prev => prev + 1)}
		/>
	)
}
