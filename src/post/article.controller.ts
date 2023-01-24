import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { Response } from 'express';


@Controller()
export class ArticleController {
  constructor(private postService: ArticleService) {}

  @Get('/create')
  root(@Res() res: Response) {
    return res.render('create');
  }

  @Post('/create')
  @Redirect('/')
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get('/')
  getAllPosts(@Res() res: Response) {
    this.postService.findAll().then((data) => {
      res.render('index', { articles: data });
    });
  }

  @Get('/article/:id')
  getOnePost(@Res() res: Response, @Param('id') id: number) {
    this.postService.findOne(id).then((data) => {
      res.render('show', { article: data });
    });
  }

  @Get('/edit/article/:id')
  edit(@Res() res: Response, @Param('id') id: number) {
    this.postService.findOne(id).then((data) => {
      res.render('edit', { article: data });
    });
  }

  @Post('/edit/article/:id')
  @Redirect('/')
  updatePost(@Param('id') id: number, @Body() dto: CreatePostDto) {
    return this.postService.update(id, dto);
  }

  @Post('/article/:id')
  @Redirect('/')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
