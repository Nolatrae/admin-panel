export interface IPaginationResponse<T> {
	items: T[]
	isHasMore: boolean
}

export interface IPaginationParams {
	skip?: number
	take?: number
	searchTerm?: string
}
