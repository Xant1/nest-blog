import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {User} from './user.model'
import {SequelizeModule} from "@nestjs/sequelize";
import { UserRole } from '../role/user-role.model';
import { Role } from '../role/role.model';
import {RoleModule} from '../role/role.module'
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Role, UserRole]),
  RoleModule,
  forwardRef(()=> AuthModule),],
  exports: [
    UserService,
  ]

})
export class UserModule {}
