import { Body, Controller, Post, Render } from '@nestjs/common';
import { createUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Render('auth')
  login(@Body() userDto: createUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @Render('auth')
  registration(@Body() userDto: createUserDto) {
    return this.authService.registration(userDto);
  }
}
