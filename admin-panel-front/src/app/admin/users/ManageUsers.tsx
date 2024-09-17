'use client'

import { Field } from '@/components/ui/field/Field'
import DashboardTable from '@/components/ui/table/DashboardTable'
import { IDashboardTableBaseData } from '@/components/ui/table/dashboard-table.types'

import { IUser } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { ManageUsersShowMore } from './ManageUsersShowMore'
import { useManageUsersQuery } from './useManageUsersQuery'

interface IUsersTable
	extends Pick<IUser, 'id' | 'email' | 'country' | 'avatarUrl'>,
		IDashboardTableBaseData {}

export function ManageUsers() {
	const {
		users,
		deleteUser,
		isPending,
		setPage,
		searchTerm,
		setSearchTerm,
		isHasMore,
	} = useManageUsersQuery()

	return (
		<div className='mt-5'>
			<div className='flex justify-between items-center'>
				<div>
					<h3>Users</h3>
					<Link href='/admin/users/create' className='my-5 block'>
						Create a new user
					</Link>
				</div>
				<div>
					<Field
						value={searchTerm}
						placeholder='Search term...'
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			{isPending ? (
				<Skeleton count={4} />
			) : (
				<DashboardTable<IUsersTable>
					headerActions={['Edit', 'Delete']}
					columns={[
						{
							title: 'ID',
							dataIndex: 'id',
							render: record => record.id,
						},
						{
							title: 'Avatar',
							dataIndex: 'avatarUrl',
							render: record =>
								record.avatarUrl && (
									<Image alt='' src={record.avatarUrl} width={50} height={50} />
								),
						},
						{
							title: 'Email',
							dataIndex: 'email',
							render: record => record.email,
						},
						{
							title: 'Country',
							dataIndex: 'country',
							render: record => record.country,
						},
					]}
					data={
						users?.map(({ id, ...user }) => ({
							id,
							avatarUrl: user.avatarUrl,
							email: user.email,
							country: user.country,
							editUrl: `/admin/users/edit/${id}`,
							deleteHandler: () => deleteUser(id),
						})) || []
					}
				/>
			)}
			{isHasMore && (
				<ManageUsersShowMore setPage={setPage} loading={isPending} />
			)}
		</div>
	)
}
