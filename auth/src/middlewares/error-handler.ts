import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import {
  AlternativeValidationError,
  FieldValidationError,
} from "express-validator";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      if (error.type === "field") {
        const fieldError = error as FieldValidationError;
        return { message: fieldError.msg, field: fieldError.path };
      } else if (error.type === "alternative") {
        const alternativeError = error as AlternativeValidationError;
        // Handle nested errors if needed
        return { message: alternativeError.msg };
      }
    });
    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
