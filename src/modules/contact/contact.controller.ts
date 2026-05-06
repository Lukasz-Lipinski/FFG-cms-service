import { Controller, Get } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  @Get()
  getContact(): string {
    return 'Contact page content';
  }
}
