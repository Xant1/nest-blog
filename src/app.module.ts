import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './post/article.module';
import { Article } from './post/article.model';
import { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_PASSWORD } from './config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      models: [Article],
      autoLoadModels: true,
    }),
    ArticleModule,
  ],
})
export class AppModule {}
