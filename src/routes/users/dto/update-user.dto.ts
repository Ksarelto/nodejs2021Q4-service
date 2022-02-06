import { PartialType } from '@nestjs/mapped-types';
import { ResponseUserDto } from './response-user.dto';

export class UpdateUserDto extends PartialType(ResponseUserDto) {}
