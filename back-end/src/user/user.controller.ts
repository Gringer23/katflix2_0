import {Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe} from '@nestjs/common'
import {UserService} from './user.service'
import {Auth} from '../auth/decorator/auth.decorator'
import {CurrentUser} from './user.decorator'
import {UserDto} from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Get('by-id/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.userProfile(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('favorites/:filmId')
	@Auth()
	async favorite(
		@CurrentUser('id') id: number,
		@Param('filmId') filmId: string
	) {
		return this.userService.favorite(+id, +filmId)
	}

	@Get()
	async getUsers() {
		return this.userService.getAll()
	}
}
