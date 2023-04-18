import { IFilm } from '@/types/film.interface'

export interface IVideoItem {
	item: IFilm
	removeHandler?: (filmId: number) => void
	isUpdateLink?: boolean
	isSmall: boolean
}
