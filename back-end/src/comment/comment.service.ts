import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity } from './comment.entity'
import { Repository } from 'typeorm'
import { CommentDto } from './comment.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepo: Repository<CommentEntity>
	) {}

	async create(userId: number, dto: CommentDto) {
		const newComment = this.commentRepo.create({
			message: dto.message,
			films: { id: dto.filmId },
			user: { id: userId }
		})

		return this.commentRepo.save(newComment)
	}
}
