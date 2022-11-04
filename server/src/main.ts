import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './utils/config';
import { HttpExceptionFilter } from './utils/exception.filter';
import { GlobalPipe } from './utils/global.pipe';
import { ResponseInterceptor } from './utils/response.interceptor';
const config = getConfig();
const PORT = config.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new GlobalPipe());
  await app.listen(PORT, () => {
    Logger.log(`Service is running at http://localhost:${PORT}`);
  });
}
bootstrap();
