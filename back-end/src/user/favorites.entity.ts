import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from '../utils/base'
import { UserEntity } from './user.entity'
import { FilmsEntity } from '../films/films.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity('Favorite')
export class FavoritesEntity extends Base {
	@Field(() => ManyToOne)
	@ManyToOne(() => UserEntity, user => user.favorite)
	@JoinColumn({ name: 'user_id' })
	favoriteUser: UserEntity

	@Field(() => ManyToOne)
	@ManyToOne(() => FilmsEntity, films => films.favorite)
	@JoinColumn({ name: 'film_id' })
	favoriteFilm: FilmsEntity
}
