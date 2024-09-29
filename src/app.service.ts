import { Injectable } from '@nestjs/common';
import { logs } from "@opentelemetry/api-logs";

@Injectable()
export class AppService {
  getHello(): string {
    // NOTE: `GET /` 라는 span 에 속해서 Logging 이 됨
    const logger = logs.getLogger('AppService', '1.0.0');
    logger.emit({
      body: 'Get Hello in AppService'
    })
    return 'Hello World!';
  }
}
