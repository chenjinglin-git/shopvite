import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class registerUserDto {
  @IsNotEmpty({ message: '不能为空' })
  @MaxLength(20, {
    message: '不能超过20个字符',
  })
  @MinLength(5, { message: '不能小于5个字符' })
  username: string;

  @IsNotEmpty({ message: '不能为空' })
  password: string;

  @IsOptional()
  @IsEmail({ message: '不是一个邮箱' })
  email: string;

  @IsOptional()
  @IsMobilePhone(
    'zh-CN',
    {},
    {
      message: '不是一个手机号',
    },
  )
  mobile: string;

  @IsOptional()
  @IsUrl({}, { message: '不是一个Url' })
  headImage: string;
}
