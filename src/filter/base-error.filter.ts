import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorResponseDTO } from "../error/dto/error-response.dto";
import { BaseError } from "../error/base-error";

@Catch(BaseError)
export class BaseErrorFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const dto = new ErrorResponseDTO();
    dto.statusCode = exception.getStatus();
    dto.timestamp = new Date().toISOString();
    dto.path = request.url;
    dto.method = request.method;
    dto.code = exception.code;
    dto.message = exception.getResponse()["message"] || exception.message;

    response.status(dto.statusCode).json(dto);
  }
}
