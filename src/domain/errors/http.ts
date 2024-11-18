export class HttpError extends Error {
  public statusCode: number;
  public errors: T[];

  constructor(statusCode: number, message?: string, errors?: T[]) {
    super();

    this.statusCode = statusCode;
    this.message = message || 'Internal Server Error';
    this.errors = errors || [];
  }
}

export class BadRequestError extends HttpError {
  constructor(errors?: T[]) {
    super(400, 'Bad Request', errors);
  }
}

export class NotFoundError extends HttpError {
  constructor(errors?: T[]) {
    super(404, 'Not found', errors);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(errors?: T[]) {
    super(401, 'Unauthorized', errors);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(errors?: T[]) {
    super(422, 'Unprocessable Entity', errors);
  }
}

export class InternalServerError extends HttpError {
  constructor(errors?: T[]) {
    super(500, 'Internal Server Error', errors);
  }
}
