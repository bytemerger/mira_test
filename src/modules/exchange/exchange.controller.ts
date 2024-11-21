import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/lib/exception/custom.exception.filter';
import { FXQLParser } from '../../lib/utils';
import { CreateExchangeEntriesDto } from './dto/createExchangeEntries.dto';
import { ExchangeService } from './exchange.service';

@Controller('/fxql-statements')
@UseFilters(new CustomHttpExceptionFilter())
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  async createExchange(@Body() createExchangeEntry: CreateExchangeEntriesDto) {
    const check = 'USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}';

    const parsedData = FXQLParser(createExchangeEntry.FXQL);
    console.log(parsedData);
    console.log(createExchangeEntry);
    //return await this.exchangeService.create(createExchangeEntry);
  }
}
