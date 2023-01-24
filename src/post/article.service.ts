import { Injectable } from '@nestjs/common';
import { Article } from './article.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article) private postRepository: typeof Article) {}

  async create(dto: CreatePostDto) {
    const post = await this.postRepository.create({
      ...dto,
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
    const post = await this.postRepository.update(
      { ...dto },
      { where: { id: id } },
    );
    return post;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id: id } });
    await post.destroy();
  }
}
