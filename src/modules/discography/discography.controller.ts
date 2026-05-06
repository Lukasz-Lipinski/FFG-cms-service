import { Controller, Get } from '@nestjs/common';

@Controller('discography')
export class DiscographyController {
  @Get()
  getDiscography(): string {
    return 'Discography page content';
  }
}
