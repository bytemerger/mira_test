import { Body, Controller, Post } from '@nestjs/common';
import { CreateExchangeEntriesDto } from './dto/createExchangeEntries.dto';
import { ExchangeService } from './exchange.service';

@Controller('v1/fxql-statements')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  async createExchange(@Body() createExchangeEntry: CreateExchangeEntriesDto) {
    return await this.exchangeService.create();
  }
}
