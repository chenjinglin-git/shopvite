import { Body, Controller, Post } from '@nestjs/common';
import { loginUserDto } from 'src/dto/login/login-user.dto';
import { registerUserDto } from 'src/dto/login/register-user.dto';
import { LoginService } from 'src/service/login/login.service';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  async login(@Body() body: loginUserDto) {
    const data = this.loginService.login(body);
    return data;
  }

  @Post('register')
  async register(@Body() body: registerUserDto) {
    return this.loginService.register(body);
  }
}
