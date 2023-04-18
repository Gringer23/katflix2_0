import { axiosClassic } from '../api/axios'

import { IFilm } from '@/types/film.interface'

export const FilmService = {
	async getAll() {
		return axiosClassic.get<IFilm[]>('/films')
	},
	async getMostPopular() {
		return axiosClassic.get<IFilm[]>('/films/most-popular')
	}
}
