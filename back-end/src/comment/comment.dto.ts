import { IsNumber, IsString } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CommentDto {
	@Field()
	@IsString()
	message: string

	@Field()
	@IsNumber()
	filmId: number
}
