export class HttpError<T> extends Error {
  public statusCode: number;
  public errors: T[];

  constructor(statusCode: number, message?: string, errors?: T[]) {
    super();

    this.statusCode = statusCode;
    this.message = message || 'Internal Server Error';
    this.errors = errors || [];
  }
}

export class BadRequestError<T> extends HttpError<T> {
  constructor(errors?: T[], error = 'Bad Request') {
    super(400, error, errors);
  }
}

export class NotFoundError<T> extends HttpError<T> {
  constructor(errors?: T[], error = 'Not found') {
    super(404, error, errors);
  }
}

export class UnauthorizedError<T> extends HttpError<T> {
  constructor(errors?: T[], error = 'Unauthorized') {
    super(401, error, errors);
  }
}

export class UnprocessableEntityError<T> extends HttpError<T> {
  constructor(errors?: T[], error = 'Unprocessable Entity') {
    super(422, error, errors);
  }
}

export class InternalServerError<T> extends HttpError<T> {
  constructor(errors?: T[]) {
    super(500, 'Internal Server Error', errors);
  }
}
