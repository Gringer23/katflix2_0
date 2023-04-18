import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm'
import {Base} from '../utils/base'
import {CommentEntity} from '../comment/comment.entity'
import {UserEntity} from '../user/user.entity'
import {FavoritesEntity} from '../user/favorites.entity'

@Entity('Films')
export class FilmsEntity extends Base {
	@Column()
	name: string

	@Column({ default: false, name: 'is_public' })
	isPublic: boolean

	@Column({ default: '' })
	duration?: string

	@Column({ default: '', name: 'text' })
	description?: string

	@Column({ default: '', name: 'text-2' })
	subDescription: string

	@Column({ default: '' })
	rating: string

	@Column({ default: '' })
	type: string

	@Column({ default: '' })
	genre: string

	@Column({ default: 0 })
	views: number

	@Column('text', { array: true, default: [] })
	actors: string[]

	@Column( 'simple-json',{ nullable: true})
	series: {videoPath: string, thumbnailPath: string, id: number}

	@Column({ default: '', name: 'video_path' })
	videoPath: string

	@Column({ default: '', name: 'thumbnail_path' })
	thumbnailPath: string

	@Column({ default: '', name: 'poster_name' })
	namePoster: string

	@ManyToOne(() => UserEntity, user => user.films)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => CommentEntity, comment => comment.films)
	comments: CommentEntity[]

	@OneToMany(() => FavoritesEntity, fav => fav.favoriteFilm)
	favorite: FavoritesEntity[]
}
