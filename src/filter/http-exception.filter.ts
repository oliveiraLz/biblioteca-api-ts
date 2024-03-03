import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorResponseDTO } from "../error/dto/error-response.dto";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const dto = new ErrorResponseDTO();
    dto.statusCode = exception.getStatus();
    dto.timestamp = new Date().toISOString();
    dto.path = request.url;
    dto.method = request.method;
    dto.message = exception.getResponse()["message"] || exception.message;

    response.status(dto.statusCode).json(dto);
  }
}
