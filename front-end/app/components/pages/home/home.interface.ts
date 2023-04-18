import { IFilm } from '@/types/film.interface'

export interface IHome {
	randomFilm: IFilm
	topFilm: IFilm
	newFilm: IFilm[]
}
