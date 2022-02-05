import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  order!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  userId!: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  boardId!: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  columnId!: string | null;
}
