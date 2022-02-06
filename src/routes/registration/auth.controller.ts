import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import {
  SwaggerDescription,
  SwaggerSummary,
  SwaggerTags,
} from 'src/common/swagger.messages';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthentificationService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

@ApiTags(SwaggerTags.auth)
@Controller()
export class AuthentificationController {
  constructor(private authService: AuthentificationService) {}
  @ApiOkResponse({
    description: SwaggerDescription.logIn,
    type: LoginUserDto,
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: SwaggerSummary.logIn })
  @Post('/login')
  login(@Body() loginDTO: LoginUserDto) {
    return this.authService.checkRegistration(loginDTO);
  }

  @ApiCreatedResponse({
    description: SwaggerDescription.registr,
    type: CreateUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: SwaggerSummary.registr })
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  registr(@Body() userDto: CreateUserDto) {
    return this.authService.registrUser(userDto);
  }
}
