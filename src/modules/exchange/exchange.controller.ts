import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/lib/exception/custom.exception.filter';
import { CreateExchangeEntriesDto } from './dto/createExchangeEntries.dto';
import { ExchangeService } from './exchange.service';

@Controller('/fxql-statements')
@UseFilters(new CustomHttpExceptionFilter())
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  async createExchange(@Body() createExchangeEntry: CreateExchangeEntriesDto) {
    console.log(createExchangeEntry);
    //return await this.exchangeService.create(createExchangeEntry);
  }
}
