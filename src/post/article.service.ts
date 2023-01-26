import { Injectable } from '@nestjs/common';
import { Article } from './article.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-article.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article) private postRepository: typeof Article,
    private fileService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...dto,
      image: fileName,
    });
    return post;
  }

  async findAll() {
    const posts = this.postRepository.findAll({ include: { all: true } });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id: id } });
    return post;
  }

  async update(id: number, dto: CreatePostDto) {
    const post = this.postRepository.update(dto, { where: { id } });
    return post;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id: id } });
    await post.destroy();
  }
}
