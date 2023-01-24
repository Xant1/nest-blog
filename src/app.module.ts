import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import {Post} from './post/post.model'
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
      models: [Post],
      autoLoadModels: true
  }),
    PostModule,
  ],
})
export class AppModule {}
