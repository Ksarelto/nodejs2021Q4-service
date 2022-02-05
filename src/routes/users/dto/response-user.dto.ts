import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
