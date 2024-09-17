import { Button } from './button/Button'
import { Loader } from './loader/Loader'

interface IShowMore {
	onLoadMore: () => void
	isLoading: boolean
}

export function ShowMore({ isLoading, onLoadMore }: IShowMore) {
	return (
		<div className='text-center mt-5'>
			<Button variant='secondary' onClick={onLoadMore} disabled={isLoading}>
				{isLoading ? <Loader /> : 'Show more'}
			</Button>
		</div>
	)
}
