import {IBase} from '@/types/base.interface'
import {IComment} from '@/types/comment.interface'
import {IUser} from '@/types/user.interface'

export interface ISeries {
	id: number,
	thumbnailPath: string,
	videoPath: string
}

export interface IFilm extends IBase {
	name: string
	isPublic: boolean
	duration?: number
	description?: string
	subDescription: string
	rating: number
	views: number
	actors: any
	videoPath: string
	thumbnailPath: string
	namePoster: string
	user: IUser
	comments: IComment[]
	series: ISeries[]
}

export interface IFilmDto
	extends Pick<
		IFilm,
		| 'id'
		| 'thumbnailPath'
		| 'description'
		| 'rating'
		| 'name'
		| 'videoPath'
		| 'subDescription'
		| 'isPublic'
		| 'namePoster'
	> {}
