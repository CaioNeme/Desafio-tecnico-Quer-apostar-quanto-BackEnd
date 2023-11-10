import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApplicationError, RequestError } from "@/protocols";

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "BadRequest") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === "InvalidDataError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
