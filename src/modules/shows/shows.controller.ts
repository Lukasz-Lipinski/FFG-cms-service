import { Controller, Get } from '@nestjs/common';

@Controller('shows')
export class ShowsController {
  @Get()
  getShows(): string {
    return 'Shows page content';
  }
}
