import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class bannedUser implements NestMiddleware {
   constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    
   const Token = req.cookies.jwt;

   const decodedToken: any = this.jwtService.decode(Token)

   const banned  = decodedToken.banned
   

    if (banned === true) {
      throw new HttpException(
        'Forbidden for banned user',
        HttpStatus.FORBIDDEN,
      );
    }

    next();
  }
}
