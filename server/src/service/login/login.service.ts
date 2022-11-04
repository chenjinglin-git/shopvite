import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/db/Entities/user.entity';
import { loginUserDto } from 'src/dto/login/login-user.dto';
import { registerUserDto } from 'src/dto/login/register-user.dto';
import { Crud } from 'src/utils/crud.utils';
import { DataSource } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    private readonly ds: DataSource,
    private jwtService: JwtService,
  ) {}
  logincrud = new Crud(User, this.ds);
  async login(body: loginUserDto): Promise<{ access_token: string }> {
    const { username, email, mobile, password } = body;
    let data;
    if (username) {
      data = await this.ds.manager.findOneBy(User, {
        username,
      });
    } else if (email) {
      data = await this.ds.manager.findOneBy(User, {
        email,
      });
    } else if (mobile) {
      data = await this.ds.manager.findOneBy(User, { mobile });
    } else {
      throw new HttpException('请输入用户名，邮箱或手机登录', 400);
    }
    if (!data || data.password !== password) {
      throw new HttpException('用户名或密码错误', 400);
    }
    const payload = {
      username: data.username,
      userid: data.userid,
    };
    const token = this.jwtService.sign(payload);
    await this.logincrud.update({
      accessToken: token,
      userid: data.userid,
    });
    return {
      access_token: token,
    };
  }

  async register(boby: registerUserDto): Promise<string> {
    const findone = await this.ds.manager.findOneBy(User, {
      username: boby.username,
    });
    if (findone === null) {
      const data = await this.logincrud.create(boby);
      if (data) return '注册成功';
      else throw new HttpException('注册失败', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('用户名已注册', HttpStatus.BAD_REQUEST);
  }
}
