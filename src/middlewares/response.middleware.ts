import type { Response, NextFunction, Request } from "express";
import { HttpStatusCode, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants.ts";

export function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  res.ok = function<T> (data: T, message = SUCCESS_MESSAGES.OK) {
    return this.status(HttpStatusCode.OK).json({
      success: true,
      message,
      data
    });
  };

  res.created = function<T> (data: T, message = SUCCESS_MESSAGES.CREATED) {
    return this.status(HttpStatusCode.CREATED).json({
      success: true,
      message,
      data
    });
  };

  res.badRequest = function (message = ERROR_MESSAGES.BAD_REQUEST) {
    return this.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message
    });
  };

  res.unauthorized = function (message = ERROR_MESSAGES.UNAUTHORIZED) {
    return this.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message
    });
  };

  res.notFound = function (message = ERROR_MESSAGES.NOT_FOUND) {
    return this.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      message
    });
  };

  res.internalError = function (message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR) {
    return this.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message
    });
  };

  next();
}
