import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  columns!: {
    id: string;
    title: string;
    order: number;
  }[];
}
