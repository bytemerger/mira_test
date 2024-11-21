import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as convict from 'convict';
import { schema } from 'config.schema';
import { ExchangeModule } from './modules/exchange/exchange.module';
import { PrismaModule } from './lib/prisma/prisma.module';
import { HealthModule } from './modules/healthz/healthz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate(env: Record<string, string | undefined>) {
        return convict(schema, { env })
          .validate({ allowed: 'strict' })
          .get() as Record<string, unknown>;
      },
    }),
    PrismaModule,
    ExchangeModule,
    HealthModule
  ],
  controllers: [],
})
export class AppModule {}
