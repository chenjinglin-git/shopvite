import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class GlobalPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const dto = plainToInstance(metadata.metatype, value);
    const errors = await validate(dto);
    const error = errors.map((value) => {
      const { property, constraints } = value;
      return { property, constraints };
    });
    if (errors.length > 0) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
