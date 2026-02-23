import { AppError } from "./AppError";
import { ErrorTypes } from "./ErrorType";

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, { type: ErrorTypes.BAD_REQUEST_ERROR, code: 400 });
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, { type: ErrorTypes.CONFLICT_ERROR, code: 409 });
  }
}
export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, { type: ErrorTypes.INTERNAL_SERVER_ERROR, code: 500 });
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, { type: ErrorTypes.FORBIDDEN_ERROR, code: 403 });
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, { type: ErrorTypes.NOT_FOUND_ERROR, code: 404 });
  }
}
export class UnauthorizedError extends AppError {
  constructor(message: string, type: string = ErrorTypes.UNAUTHORIZED_ERROR) {
    super(message, { type: type, code: 401 });
  }
}
export class UnprocessableError extends AppError {
  constructor(message: string) {
    super(message, { type: ErrorTypes.UNPROCESSABLE_ENTITY, code: 422 });
  }
}
