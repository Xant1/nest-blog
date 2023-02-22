import { IsEmail, IsString, Length } from 'class-validator';

export class createUserDto {
  @IsEmail({}, { message: 'incorrect email' })
  @IsString({ message: 'Email must be a string' })
  readonly email: string;
  @Length(5, 19, {
    message: 'The password must be at least 5 and no more than 19',
  })
  readonly password: string;
}

