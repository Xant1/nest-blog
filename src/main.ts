import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PORT } from './config';
import { initialRoles } from './shared';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views/pages'));
  app.setViewEngine('ejs');

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));

  // if you are launching the database for the first time, uncomment the code below to create roles in the roles database manually
  // initialRoles();
}
bootstrap();
