import { UnauthorizedError } from '@/domain/errors/http';
import { TSearchUserDTO } from '@/dtos/user/search.dto';
import Token from '@/libs/jwt.libs';
import UserRepositoryInterface from '@/repositories/user-repository.interface';
import { verifyPassword } from '@/utils/hash-password.utils';

export default class AuthService {
  constructor(private userRepository: UserRepositoryInterface) {}

  async auth(searchUserDto: TSearchUserDTO): Promise<string> {
    const { password, email } = searchUserDto;

    const user = await this.userRepository.findByEmailOrThrow(email);

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    const token = await Token.createToken({
      email: user.email,
      id: user.id
    });

    return token;
  }
}
