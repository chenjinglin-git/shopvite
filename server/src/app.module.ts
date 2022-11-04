import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils/config';
import { IndexModule } from './model/index.module';
@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [getConfig],
    }),
    IndexModule,
  ],
})
export class AppModule {}
