import { HttpError } from '@/domain/errors/http';

export class UserAlreadyExistsError<T> extends HttpError<T> {
  constructor() {
    super(422, 'User already exists');
  }
}
