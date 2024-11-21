import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, BadRequestException } from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { ExchangeController } from '../src/modules/exchange/exchange.controller';
import { ExchangeService } from '../src/modules/exchange/exchange.service';
import { FXQLParserError } from '../src/lib/exception/FXQLParser.error';

describe('ExchangeController (e2e)', () => {
  let app: INestApplication;

  // Mock ExchangeService
  const mockExchangeService = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        {
          provide: ExchangeService,
          useValue: mockExchangeService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /create-exchange', () => {
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

      mockExchangeService.create.mockResolvedValue(parsedData);

      const response = await request(app.getHttpServer())
        .post('/fxql-statements') // Assuming the route path is '/create-exchange'
        .send({ FXQL: mockFxql })
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
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

      const response = await request(app.getHttpServer())
        .post('/fxql-statements') // Assuming the route path is '/create-exchange'
        .send({ FXQL: mockFxql })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toBe('Invalid Buy rate for USD-GBP');
      expect(response.body.code).toBe(`FXQL-${HttpStatus.BAD_REQUEST}`);
    });
  });
});
