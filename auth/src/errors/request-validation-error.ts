import { ValidationError } from "express-validator";

// Define an interface for the common properties
interface CommonErrorProperties {
    message: any;
    field?: string;
  }
  
  // Define the types for each specific error
  type FieldValidationError = CommonErrorProperties & {
    type: 'field';
    location: string; // Change the type if needed
    path: string;
    value: any;
  };
  
  type AlternativeValidationError = CommonErrorProperties & {
    type: 'alternative';
    nestedErrors: FieldValidationError[];
  };
  
  export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
      super();
  
      // Only because we are extending a built-in class
      Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
  }
