export class FXQLParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FXQLError';
  }
}
