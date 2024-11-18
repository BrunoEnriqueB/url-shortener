import { HttpError, NotFoundError } from '@/domain/errors/http';

export class UserAlreadyExistsError<T> extends HttpError<T> {
  constructor() {
    super(403, 'User already exists');
  }
}

export class UserNotFoundError<T> extends NotFoundError<T> {
  constructor(errors?: T[]) {
    super(errors, 'User not found');
  }
}
