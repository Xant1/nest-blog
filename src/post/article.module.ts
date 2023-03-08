import { forwardRef, Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    SequelizeModule.forFeature([Article]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
})
export class ArticleModule {}
