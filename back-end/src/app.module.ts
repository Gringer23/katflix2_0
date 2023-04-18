import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from '../../../katflix 2.0/back-end/src/config/typeorm.config'
import { UserModule } from '../../../katflix 2.0/back-end/src/user/user.module'
import { FilmsModule } from '../../../katflix 2.0/back-end/src/films/films.module'
import { CommentModule } from '../../../katflix 2.0/back-end/src/comment/comment.module'
import { AuthModule } from '../../../katflix 2.0/back-end/src/auth/auth.module'
import { MediaModule } from '../../../katflix 2.0/back-end/src/media/media.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		UserModule,
		FilmsModule,
		CommentModule,
		AuthModule,
		MediaModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
