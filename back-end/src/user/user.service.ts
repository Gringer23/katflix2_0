import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './user.dto'
import { genSalt, hash } from 'bcryptjs'
import { FavoritesEntity } from './favorites.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
		@InjectRepository(FavoritesEntity)
		private readonly favRepo: Repository<FavoritesEntity>
	) {}

	//by id
	async byId(id: number) {
		const user = await this.userRepo.findOne({
			where: {
				id
			},
			relations: {
				films: true,
				favorite: {
					favoriteFilm: true
				}
			}
		})

		if (!user) throw new NotFoundException('Пользователь не найден!')
		return user
	}

	//update
	async userProfile(id: number, dto: UserDto) {
		const user = await this.byId(id)
		const isUserSame = await this.userRepo.findOneBy({ email: dto.email })
		if (isUserSame && id !== isUserSame.id)
			throw new BadRequestException('E-mail занят')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.avatarPath = dto.avatarPath
		user.isAdmin = dto.isAdmin

		return this.userRepo.save(user)
	}

	//favorite
	async favorite(id: number, filmId: number) {
		const data = {
			favoriteFilm: { id: filmId },
			favoriteUser: { id }
		}
		const isFav = await this.favRepo.findOneBy(data)
		if (!isFav) {
			const newFav = await this.favRepo.create(data)
			await this.favRepo.save(newFav)
			return true
		}

		await this.favRepo.delete(data)
		return false
	}

	//get all
	async getAll() {
		return this.userRepo.find()
	}
}
