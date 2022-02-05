import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileInterceptor } from '../../interceptors/files.interceptor';
import { AuthGuard } from 'src/routes/registration/auth.guard';
import {
  SwaggerDescription,
  SwaggerResponse,
  SwaggerSummary,
  SwaggerTags,
} from 'src/common/swagger.messages';

@ApiTags(SwaggerTags.files)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: SwaggerResponse.forbidden })
@ApiUnauthorizedResponse({ description: SwaggerResponse.unauthorized })
@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: SwaggerSummary.fileUpload })
  @ApiCreatedResponse({ description: SwaggerDescription.fileUpload })
  @Post()
  @UseInterceptors(FileInterceptor)
  @HttpCode(HttpStatus.CREATED)
  create() {
    return 'File uploaded';
  }

  @ApiOperation({ summary: SwaggerSummary.fileDownload })
  @ApiOkResponse({ description: SwaggerDescription.fileDownload })
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.filesService.find(name);
  }
}
