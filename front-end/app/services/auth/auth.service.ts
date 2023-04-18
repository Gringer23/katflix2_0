import {axiosClassic} from '../../api/axios'

import {IAuthData} from '@/services/auth/auth.helper'

export const AuthService = {
	async login(email: string, password: string,) {
		const response = await axiosClassic.post<IAuthData>('/auth/login', {
			email,
			password,
		})
		return response.data
	},
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthData>('/auth/register', {
			email,
			password,
		})
		return response.data
	}
}
