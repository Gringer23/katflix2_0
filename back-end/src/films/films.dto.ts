import {IsNumber, IsString} from 'class-validator'

export class FilmsDto {
	@IsString()
	name: string

	@IsString()
	description: string

	isPublic?: boolean

	duration?: string

	@IsString()
	videoPath: string

	@IsString()
	thumbnailPath: string

	@IsNumber()
	rating: string

	actors?: string[]

	@IsString()
	subDescription: string

	@IsString()
	namePoster: string

	@IsString()
	type: string

	@IsString()
	genre: string
}
