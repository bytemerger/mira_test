import { Injectable, NotFoundException } from '@nestjs/common';
import { ExchangeStatementEntry } from '@prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Injectable()
export class ExchangeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    exchangeEntries: ExchangeStatementEntry[],
  ): Promise<ExchangeStatementEntry> {
    return this.prismaService.save();
  }
}
