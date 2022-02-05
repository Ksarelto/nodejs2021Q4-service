import { IsJWT } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisteredUserDto extends CreateUserDto {
  @ApiProperty()
  @IsJWT()
  token!: string;
}
