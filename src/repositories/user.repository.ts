import { UserAlreadyExistsError } from '@/domain/errors/user';
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
}

export default UserRepository;
