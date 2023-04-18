import {IBase} from '@/types/base.interface'
import {IFilm} from '@/types/film.interface'
import {IUser} from '@/types/user.interface'

export interface IComment extends IBase {
	message: string
	user: IUser
	films: IFilm
}

export interface ICommentDto extends Pick<IComment, 'message'> {
	filmId: number | undefined
}
