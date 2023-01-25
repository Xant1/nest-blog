import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [SequelizeModule.forFeature([Article]), FilesModule],
})
export class ArticleModule {}
