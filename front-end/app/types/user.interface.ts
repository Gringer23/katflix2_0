import {IBase} from '@/types/base.interface'
import {IFilm} from '@/types/film.interface'

export interface IUser extends IBase {
	email: string
	name: string
	isAdmin?: boolean
	favorite?: IFilm[]

	avatarPath?: string
	films?: IFilm[]
}
