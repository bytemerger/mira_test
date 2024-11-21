import { IsNotEmpty, Length } from 'class-validator';

export class CreateExchangeEntriesDto {
  @IsNotEmpty()
  @Length(5, 45000)
  FXQL: string;
}
