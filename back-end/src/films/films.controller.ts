import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import {FilmsService} from './films.service'
import {Auth} from '../auth/decorator/auth.decorator'
import {FilmsDto} from './films.dto'
import {CurrentUser} from '../user/user.decorator'

@Controller('films')
export class FilmsController {
	constructor(private readonly filmsService: FilmsService) {}

	@Get('get-private/:id')
	@Auth()
	async getFilmPrivate(@Param('id') id: string) {
		return this.filmsService.byId(+id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.filmsService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.filmsService.getMostPopular()
	}

	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.filmsService.byId(+id)
	}

	@Get('series/:id/:serialId')
	async getSerial(@Param('id') id: string, @Param('serialId') serialId: string) {
		return this.filmsService.byIdSerial(+id, +serialId)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createFilm(@CurrentUser('id') id: number, @Body() dto: FilmsDto) {
		return this.filmsService.create(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateFilm(@Param('id') id: string, @Body() dto: FilmsDto) {
		return this.filmsService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteFilm(@Param('id') id: string) {
		return this.filmsService.delete(+id)
	}

	@HttpCode(200)
	@Put('update-views/:filmId')
	async updateViews(@Param('filmId') filmId: string) {
		return this.filmsService.updateCountViews(+filmId)
	}
}
