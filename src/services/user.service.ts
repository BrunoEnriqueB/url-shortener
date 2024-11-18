import { hashPassword } from '@/utils/hash-password.utils';

import { TCreateUserDTO } from '@/dtos/user/create.dto';
import UserRepositoryInterface from '@/repositories/user-repository.interface';

export default class UserService {
  constructor(private userRepository: UserRepositoryInterface) {}

  async createUser(user: TCreateUserDTO) {
    const hashedPassword = await hashPassword(user.password);

    user.password = hashedPassword;

    await this.userRepository.createUser(user);
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.userRepository.findByEmailOrThrow(email);

    return user;
  }
}
