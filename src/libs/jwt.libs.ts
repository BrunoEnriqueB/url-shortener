import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '@/domain/errors/http';

import env from '@/config/environment';
import { TokenUserDTO, TTokenUserDTO } from '@/dtos/user/token.dto';

export default class Token {
  static async createToken(userInformation: TTokenUserDTO): Promise<string> {
    const token = jwt.sign(userInformation, env.SECRET);

    return token;
  }

  static async getUserInformation(token: string): Promise<TTokenUserDTO> {
    try {
      const user = jwt.verify(token, env.SECRET);

      const userInformation = TokenUserDTO.safeParse(user);

      if (!userInformation.success) {
        throw new UnauthorizedError();
      }

      return userInformation.data as TTokenUserDTO;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }
}
