import { Module } from '@nestjs/common';
import { HealthController } from './healthz.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class HealthModule {}