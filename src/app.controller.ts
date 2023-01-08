import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get('/health')
  checkHealth(): string {
    return 'I am in pink of health.'
  }
}
