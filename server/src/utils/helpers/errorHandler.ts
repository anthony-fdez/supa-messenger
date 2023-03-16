export class ErrorHandler extends Error {
  private _statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this._statusCode = statusCode;
  }

  public set statusCode(statusCode: number) {
    this._statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}
