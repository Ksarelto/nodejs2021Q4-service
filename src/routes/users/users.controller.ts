import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/routes/registration/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logger.interceptor';
import { ResponseUserDto } from './dto/response-user.dto';
import {
  SwaggerDescription,
  SwaggerResponse,
  SwaggerSummary,
  SwaggerTags,
} from 'src/common/swagger.messages';

@ApiTags(SwaggerTags.user)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: SwaggerResponse.forbidden })
@ApiUnauthorizedResponse({ description: SwaggerResponse.unauthorized })
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: SwaggerDescription.createUser,
    type: ResponseUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: SwaggerSummary.createUser })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOkResponse({
    description: SwaggerDescription.getAllUsers,
    type: ResponseUserDto,
  })
  @ApiOperation({ summary: SwaggerSummary.getAllUsers })
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @ApiOkResponse({
    description: SwaggerDescription.getUser,
    type: ResponseUserDto,
  })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.getOneUser })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @ApiOkResponse({
    description: SwaggerDescription.updateUser,
    type: ResponseUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.updateUser })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiNoContentResponse({
    description: SwaggerDescription.deleteUser,
  })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.deleteUser })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
