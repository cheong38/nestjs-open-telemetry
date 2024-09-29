import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { logs } from "@opentelemetry/api-logs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // NOTE: `GET /` 라는 span 에 속해서 Logging 이 됨
    const logger = logs.getLogger('AppController', '1.0.0');
    logger.emit({
      body: 'Get Hello'
    })
    return this.appService.getHello();
  }
}
