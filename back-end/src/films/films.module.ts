import { Module } from '@nestjs/common'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmsEntity } from './films.entity'

@Module({
	controllers: [FilmsController],
	providers: [FilmsService],
	imports: [TypeOrmModule.forFeature([FilmsEntity])]
})
export class FilmsModule {}
