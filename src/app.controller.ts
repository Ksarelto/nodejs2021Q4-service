import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import {
  SwaggerDescription,
  SwaggerSummary,
  SwaggerTags,
} from './common/swagger.messages';

@ApiTags(SwaggerTags.primary)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: SwaggerDescription.sayHell,
  })
  @ApiOperation({ summary: SwaggerSummary.primeRoute })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
