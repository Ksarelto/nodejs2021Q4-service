import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login!: string;
}
