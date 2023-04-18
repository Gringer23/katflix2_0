import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from '../utils/base'
import { UserEntity } from '../user/user.entity'
import { FilmsEntity } from '../films/films.entity'

@Entity('Comment')
export class CommentEntity extends Base {
	@Column({ type: 'text' })
	message: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => FilmsEntity, films => films.comments)
	@JoinColumn({ name: 'film_id' })
	films: FilmsEntity
}
