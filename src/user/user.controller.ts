import { Body, Controller, Get, Res, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userDto: createUserDto) {
    return this.userService.createUser(userDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('manage')
  getAllUser(@Res() res: Response) {
    return this.userService.getAllUsers().then((data) => {
      res.render('getUsers', { users: data });
    });
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/ban')
  getBannedUsers(@Res() res: Response) {
    return this.userService.getBannedUsers().then((data) => {
      res.render('bannedUsers', { users: data });
    });
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('manage')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
