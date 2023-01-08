import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  getHello(): string {
    return 'I am in pink of health.'
  }
}
