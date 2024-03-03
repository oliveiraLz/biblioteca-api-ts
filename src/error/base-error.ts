import { HttpException } from "@nestjs/common";
import { BaseErrorData } from "./base-error-data";

export class BaseError extends HttpException {
  code: string;

  constructor({ code, message, status }: BaseErrorData) {
    super(message, status);
    this.code = code;
    this.message = message;
  }
}
