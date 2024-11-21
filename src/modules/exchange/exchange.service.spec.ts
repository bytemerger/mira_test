import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { ExchangeStatementEntry } from '@prisma/client';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  const prismaClient = {
    exchangeStatementEntry: {
      createManyAndReturn: jest.fn(),
    },
  } as unknown as PrismaService;

  let exchangeService: ExchangeService;

  beforeEach(async () => {
    const { ExchangeService } = await import('./exchange.service');
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: PrismaService, useValue: prismaClient },
      ],
    }).compile();

    exchangeService = app.get(ExchangeService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should add exchange entries to the database', async () => {
    const exchangeEntries: ExchangeStatementEntry[] = [
      { id: 1, amount: 100, currency: 'USD' } as unknown as  ExchangeStatementEntry,
      { id: 2, amount: 200, currency: 'EUR' } as unknown as ExchangeStatementEntry,
    ];

    (prismaClient.exchangeStatementEntry.createManyAndReturn as jest.Mock).mockResolvedValue(exchangeEntries);

    const result = await exchangeService.create(exchangeEntries);

    expect(prismaClient.exchangeStatementEntry.createManyAndReturn).toHaveBeenCalledTimes(1);
    expect(prismaClient.exchangeStatementEntry.createManyAndReturn).toHaveBeenCalledWith({
      data: exchangeEntries,
    });
    expect(result).toEqual(exchangeEntries);
  });

  it('should throw an error if database operation fails', async () => {
    const exchangeEntries: ExchangeStatementEntry[] = [
      { id: 1, amount: 100, currency: 'USD' } as unknown as ExchangeStatementEntry,
    ];

    (prismaClient.exchangeStatementEntry.createManyAndReturn as jest.Mock).mockRejectedValue(new Error('Database Error'));

    await expect(exchangeService.create(exchangeEntries)).rejects.toThrowError('Database Error');
  });
});
