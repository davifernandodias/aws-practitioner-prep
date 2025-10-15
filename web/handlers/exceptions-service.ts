export class QUIZException extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}