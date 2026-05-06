import { Controller, Get } from '@nestjs/common';

@Controller('merch')
export class MerchController {
  @Get()
  getMerch(): string {
    return 'Merchandise page content';
  }
}
