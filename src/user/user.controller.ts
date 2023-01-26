import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

   constructor(private userService: UserService) {}
   
   @Post()
   create(@Body() userDto: createUserDto) {
      return this.userService.createUser(userDto)
   }

   @Get()
   getAllUser() {
      return this.userService.getAllUsers
   }

}
