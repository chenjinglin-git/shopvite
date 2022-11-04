import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from 'src/api/login/login.controller';
import { LoginService } from 'src/service/login/login.service';
import { getConfig } from 'src/utils/config';

@Module({
  imports: [
    JwtModule.register({
      secret: getConfig().JWTCONSTANTS.SECRET,
      signOptions: { expiresIn: '72h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
