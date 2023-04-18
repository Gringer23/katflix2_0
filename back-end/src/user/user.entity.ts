import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '../utils/base'
import { FilmsEntity } from '../films/films.entity'
import { FavoritesEntity } from './favorites.entity'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true, nullable: true })
	email: string

	@Column({ select: false, nullable: true })
	password: string

	@Column({ default: '' })
	name?: string

	@Column({ default: false, name: 'is_admin' })
	isAdmin?: boolean

	@Column({ default: '', name: 'avatar_path' })
	avatarPath?: string

	@OneToMany(() => FilmsEntity, films => films.user)
	films: FilmsEntity[]

	@OneToMany(() => FavoritesEntity, fav => fav.favoriteUser)
	favorite: FavoritesEntity
}
