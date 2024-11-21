import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { FXQLParserError } from '../../lib/exception/FXQLParser.error';
import { BadRequestException } from '@nestjs/common';

describe('ExchangeController', () => {
  let controller: ExchangeController;

  // Create a mock version of the ExchangeService
  const mockExchangeService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        {
          provide: ExchangeService,
          useValue: mockExchangeService,
        },
      ],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createExchange', () => {
    it('should successfully parse FXQL and create exchange entries', async () => {
      const mockFxql = 'USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}';

      const parsedData = [
        {
          SourceCurrency: 'USD',
          DestinationCurrency: 'GBP',
          BuyPrice: 100,
          SellPrice: 200,
          CapAmount: 93800,
        },
      ];

      //mockExchangeService.create.mockResolvedValue(parsedData);
      (mockExchangeService.create as jest.Mock).mockResolvedValue(parsedData);
      //jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve([{EntryId: 23, ...parsedData[0]}]))

      const response = await controller.createExchange({ FXQL: mockFxql });

      expect(response).toEqual({
        message: 'FXQL Statement Parsed Successfully.',
        code: 'FXQL-200',
        data: parsedData,
      });
      expect(mockExchangeService.create).toHaveBeenCalledWith(parsedData);
    });

    it('should throw BadRequestException when FXQLParserError is thrown', async () => {
      const mockFxql = `USD-GBP {
        BUY abc
        SELL 0.90
        CAP 10000
      }`;

      mockExchangeService.create.mockRejectedValue(
        new FXQLParserError('Invalid rate for USD-GBP'),
      );

      try {
        await controller.createExchange({ FXQL: mockFxql });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid Buy rate for USD-GBP');
      }
    });
  });
});
