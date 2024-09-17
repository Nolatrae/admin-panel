import { useDebounce } from '@/hooks/useDebounce'
import userService from '@/services/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useManageUsersQuery() {
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { data, isPending, refetch } = useQuery({
		queryKey: ['users', debouncedSearch],
		queryFn: () =>
			userService.getUsers({
				searchTerm: debouncedSearch,
				skip: 0,
				take: page * 10,
			}),
	})

	useEffect(() => {
		if (page === 1) return

		refetch()
	}, [page])

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['deleteUser'],
		mutationFn: (id: number) => userService.deleteUser(id),
		onSuccess() {
			refetch()
		},
	})

	const users = data?.data.items?.length ? data.data.items : null

	return {
		users,
		isPending,
		deleteUser,
		searchTerm,
		setSearchTerm,
		isHasMore: data?.data.isHasMore,
		setPage,
	}
}
