import { Body, Controller, Delete, Get, Param, Post, Redirect, Render, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Response } from 'express';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/create')
  root(@Res() res: Response) {
    return res.render('create')
  }

  @Post('/create')
  @Redirect('/')
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get('/')  
  getAllPosts( @Res() res: Response) {
    this.postService.findAll()
    .then((data) => {
      res.render('index', {article: data})
    })
  }

  // @Get(':id')
  // getOnePost(@Param('id') id: number) {
  //   return this.postService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.postService.remove(id);
  // }
}
