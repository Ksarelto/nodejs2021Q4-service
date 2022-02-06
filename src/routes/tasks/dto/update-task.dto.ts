import { PartialType } from '@nestjs/mapped-types';
import { ResponseTaskDto } from './response-task.dto';

export class UpdateTaskDto extends PartialType(ResponseTaskDto) {}
