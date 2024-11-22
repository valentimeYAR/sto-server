import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message;
    }

    if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = (exception as any).message;
    }

    // Возвращаем ошибку в формате JSON
    response.status(status).json({
      code: status,
      message: message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
