import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

interface Exception extends HttpException {
  message: string,
  stack?: string,
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;
    const stack = exception.stack;

    console.log(`${new Date().toISOString()}: ${request.url}\n${status}: ${message}: ${stack}`);

    response
      .status(status)
      .json({
        statusCode: status,
        message: status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal Server Error'
          : message,
      });
  }
}
