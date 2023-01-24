import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';


@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  

  @Post('/create')
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get('/')  
  getAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  getOnePost(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
