import { Controller, Get } from '@nestjs/common';

@Controller('home')
export class HomeController {
  @Get()
  getHome(): string {
    return 'Home page content';
  }
}
