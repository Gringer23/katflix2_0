import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	database: 'netflix',
	password: '123456',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	autoLoadEntities: true,
	synchronize: true
})
