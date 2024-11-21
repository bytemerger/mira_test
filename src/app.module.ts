import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as convict from 'convict';
import { schema } from 'config.schema';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
