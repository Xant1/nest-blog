import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {JwtAuthGuard} from '../auth/jwt-auth.guard'

@Controller()
export class ArticleController {
  constructor(private postService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/create')
  root(@Res() res: Response) {
    return res.render('create');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @Redirect('/')
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }

  
  @Get('/')
  getAllPosts(@Res() res: Response) {
    this.postService.findAll().then((data) => {
      res.render('index', { articles: data });
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/article/:id')
  getOnePost(@Res() res: Response, @Param('id') id: number) {
    this.postService.findOne(id).then((data) => {
      res.render('show', { article: data });
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/edit/article/:id')
  edit(@Res() res: Response, @Param('id') id: number) {
    this.postService.findOne(id).then((data) => {
      res.render('edit', { article: data });
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/edit/article/:id')
  @Redirect('/')
  update(@Body() dto: CreatePostDto, @Param('id') id: number) {
    return this.postService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/article/:id')
  @Redirect('/')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
