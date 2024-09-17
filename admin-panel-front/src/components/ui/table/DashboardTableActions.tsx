import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

import styles from './DashboardTable.module.scss'
import type { IDashboardTableBaseData } from './dashboard-table.types'

export function DashboardTableActions<TData extends IDashboardTableBaseData>({
	baseRecord,
}: {
	baseRecord: TData
}) {
	const { deleteHandler, editUrl } = baseRecord

	return (
		<>
			{editUrl && (
				<td className={styles.minWidth}>
					<Link href={editUrl} aria-label='Open edit page'>
						<Edit />
					</Link>
				</td>
			)}
			{deleteHandler && (
				<td className={styles.minWidth}>
					<button onClick={deleteHandler} aria-label='Delete'>
						<Trash2 />
					</button>
				</td>
			)}
		</>
	)
}
