import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'src/utils/config';
import { User } from './Entities/user.entity';

const config = getConfig().DB;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.TYPE,
      host: config.HOST,
      port: config.PORT,
      username: config.USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
