import { PartialType } from '@nestjs/mapped-types';
import { ResponseColumnDto } from './response-column.dto';

export class UpdateColumnDto extends PartialType(ResponseColumnDto) {}
