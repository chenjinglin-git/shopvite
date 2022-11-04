import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [LoginModule, AuthModule],
})
export class IndexModule {}
