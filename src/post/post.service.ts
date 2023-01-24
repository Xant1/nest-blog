import { Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

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

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id: id } });
    await post.destroy();
  }
}
