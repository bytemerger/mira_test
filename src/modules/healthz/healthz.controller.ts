import { Controller, Get } from '@nestjs/common';

@Controller('/healthz')
export class HealthController {
  public constructor(
  ) {}

  @Get()
  public async check(): Promise<{}> {
    return {
        "message": "Api is live",
        "code": "FXQL-200"
      }
  }
}
