import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,
  ) {}

  getHello(): string {
    return this.appService.getHello();
  }
}
