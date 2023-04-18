import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {FindOptionsWhereProperty, ILike, MoreThan, Repository} from 'typeorm'
import {FilmsEntity} from './films.entity'
import {FilmsDto} from './films.dto'

@Injectable()
export class FilmsService {
	private film: any;
	constructor(
		@InjectRepository(FilmsEntity)
		private readonly filmRepo: Repository<FilmsEntity>
	) {}

	//by id
	async byId(id: number, isPublic = false) {
		const video = await this.filmRepo.findOne({
			where: isPublic
				? {
						id,
						isPublic: true
				  }
				: {
						id
				  },
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				comments: {
					id: true,
					message: true,
					user: {
						id: true,
						name: true,
						avatarPath: true
					}
				}
			}
		})

		if (!video) throw new NotFoundException('Фильм не найден!')
		return video
	}

	async byIdSerial(id: number, serialId: number) {
		const film = await this.byId(id).then(res => res.series)
		const serial = film[serialId - 1]

		if (!serial) throw new NotFoundException('Серии не найдены!')
		return serial
	}
	//update
	async update(id: number, dto: FilmsDto) {
		const film = await this.byId(id)
		return this.filmRepo.save({
			...film,
			...dto
		})
	}

	//get all
	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<FilmsEntity> = {}

		if (searchTerm)
			options = {
				name: ILike(`%${searchTerm}%`)
			}
		return this.filmRepo.find({
			where: {
				...options,
				isPublic: true
			},
			order: {
				createAt: 'DESC'
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true
				}
			}
		})
	}

	async getMostPopular() {
		return this.filmRepo.find({
			where: {
				views: MoreThan(0)
			},
			relations: {
				user: true
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true
				}
			},
			order: {
				views: -1
			}
		})
	}

	async create(userId: number) {
		const defaultValue = {
			name: '',
			userId: { id: userId },
			videoPath: '',
			description: '',
			thumbnailPath: ''
		}

		const newFilm = this.filmRepo.create(defaultValue)
		const film = await this.filmRepo.save(newFilm)
		return film.id
	}

	async delete(id: number) {
		return this.filmRepo.delete({ id })
	}

	async updateCountViews(id: number) {
		const video = await this.byId(id)
		video.views++
		return this.filmRepo.save(video)
	}
}
