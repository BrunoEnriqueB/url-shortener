import { HttpError, NotFoundError } from '@/domain/errors/http';

export class LinkAlreadyExistsError<T> extends HttpError<T> {
  constructor() {
    super(422, 'Link already exists');
  }
}

export class LinkNotFoundError<T> extends NotFoundError<T> {
  constructor(errors?: T[]) {
    super(errors, 'Link not found');
  }
}
