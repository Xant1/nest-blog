import { Body, Res, Controller, Post, Get, Redirect } from '@nestjs/common';
import { createUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/registration')
  getRegPage(@Res() res: Response) {
    res.render('auth');
  }

  @Get('/login')
  getLogPage(@Res() res: Response) {
    res.render('auth');
  }

  @Post('/registration')
  // @Redirect('/')
  registration(@Body() userDto: createUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/login')
  // @Redirect('/')
  async login(
    @Body() userDto: createUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.login(userDto);
    res.cookie('jwt', jwt.token, { httpOnly: true });
    return this.authService.login(userDto);
  }
}
