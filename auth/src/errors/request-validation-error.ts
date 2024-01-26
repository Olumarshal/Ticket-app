import { ValidationError, FieldValidationError as ExpressFieldValidationError } from "express-validator";
import { CustomError } from "./custom-error";

// Define an interface for the common properties
interface CommonErrorProperties {
  message: any;
  field?: string;
}

// Define the types for each specific error
type FieldValidationError = CommonErrorProperties & ExpressFieldValidationError;

type AlternativeValidationError = CommonErrorProperties & {
  type: 'alternative';
  nestedErrors: FieldValidationError[];
};

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((error) => {
      if (error.type === "field") {
        const fieldError = error as FieldValidationError;
        return { message: fieldError.msg, field: fieldError.path };
      }
      // Handle other types if needed
      return { message: 'Unknown error type' };
    });

    return formattedErrors;
  }
}
