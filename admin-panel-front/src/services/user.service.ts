import { instance } from '@/api/axios'
import { IUserFormState } from '@/app/admin/users/user-form.types'

import { IUser } from '@/types'

export interface IPaginationResponse<T> {
	items: T[]
	isHasMore: boolean
}

export interface IPaginationParams {
	skip?: number
	take?: number
	searchTerm?: string
}

class UserService {
	private base = '/users'

	async getUsers(params?: IPaginationParams) {
		return instance.get<IPaginationResponse<IUser>>(`${this.base}`, { params })
	}

	async getUserById(id: string | number) {
		return instance.get<IUser>(`${this.base}/${id}`)
	}

	async createUser(createUserDto: IUserFormState) {
		return instance.post<IUser>(`${this.base}`, createUserDto)
	}

	async updateUser(id: string | number, updateDto: IUserFormState) {
		return instance.put<IUser>(`${this.base}/${id}`, updateDto)
	}

	async deleteUser(id: string | number) {
		return instance.delete<void>(`${this.base}/${id}`)
	}
}

export default new UserService()
