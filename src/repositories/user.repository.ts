import {
  UserAlreadyExistsError,
  UserNotFoundError
} from '@/domain/errors/user';
import { TCreateUserDTO } from '@/dtos/user/create.dto';
import User from '@/models/user.model';
import UserRepositoryInterface from './user-repository.interface';

class UserRepository implements UserRepositoryInterface {
  async createUser(userDTO: TCreateUserDTO): Promise<User> {
    const findUser = await User.query().where({
      email: userDTO.email
    });

    if (findUser.length) {
      throw new UserAlreadyExistsError();
    }

    const newUser = await User.query().insertAndFetch(userDTO);

    return newUser;
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await User.query()
      .where({
        email: email
      })
      .first();

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}

export default UserRepository;
