import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  password!: string;
}
