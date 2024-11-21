import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';

type CurrencyPair = {
  sourceCurrency: string;
  destinationCurrency: string;
  buyPrice: number;
  sellPrice: number;
  capAmount: number;
};
@Injectable()
export class ExchangeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    exchangeEntries: CurrencyPair[],
  ): Promise<CurrencyPair & { EntryId: number }> {
    return this.prismaService.save();
  }
}
