import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/lib/exception/custom.exception.filter';
import { FXQLParserError } from 'src/lib/exception/FXQLParser.error';
import { FXQLParser } from '../../lib/utils';
import { CreateExchangeEntriesDto } from './dto/createExchangeEntries.dto';
import { ExchangeService } from './exchange.service';

@Controller('/fxql-statements')
@UseFilters(new CustomHttpExceptionFilter())
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  async createExchange(@Body() createExchangeEntry: CreateExchangeEntriesDto) {
    try {
      const parsedData = FXQLParser(createExchangeEntry.FXQL);
      console.log(parsedData);
      console.log(createExchangeEntry);
      const storedStatements = await this.exchangeService.create(parsedData);
      return {
        message: 'FXQL Statement Parsed Successfully.',
        code: 'FXQL-200',
        data: storedStatements,
      };
    } catch (error) {
      if (error instanceof FXQLParserError) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
