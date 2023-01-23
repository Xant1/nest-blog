import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './post/post.module';
import {Post} from './post/post.model'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('process.env.DB_HOST'),
        port: +configService.get('process.env.DB_PORT'),
        username: configService.get('process.env.DB_USER'),
        password: configService.get('process.env.DB_PASSWORD'),
        database: configService.get('process.env.DB_NAME'),
        models: [Post],
      }),
      inject: [ConfigService],
    }),
    PostModule,
  ],
})
export class AppModule {}
