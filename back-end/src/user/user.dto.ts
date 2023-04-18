import { IsBoolean, IsEmail, IsString } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	password?: string

	@IsString()
	name: string

	@IsBoolean()
	isAdmin: boolean

	@IsString()
	avatarPath?: string
}
