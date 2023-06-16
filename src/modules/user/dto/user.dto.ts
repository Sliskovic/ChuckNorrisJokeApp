import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  lastName: string;

  createdAt: Date;
}
