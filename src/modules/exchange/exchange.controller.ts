import { Body, Controller, Post } from '@nestjs/common';
import { CreateExchangeEntriesDto } from './dto/createExchangeEntries.dto';
import { ExchangeService } from './exchange.service';

@Controller('/fxql-statements')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  async createExchange(@Body() createExchangeEntry: CreateExchangeEntriesDto) {
    console.log(createExchangeEntry)
    //return await this.exchangeService.create(createExchangeEntry);
  }
}
