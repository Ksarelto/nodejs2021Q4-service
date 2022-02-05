import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  board!: string;
}