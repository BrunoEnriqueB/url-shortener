import { Request } from 'express';

import Token from '@/libs/jwt.libs';
import UserRepository from '@/repositories/user.repository';
import UserService from '@/services/user.service';

export default async function validateToken(req: Request) {
  const { authorization } = req.headers;

  if (!authorization) return;

  const token = authorization.split(' ')[1];

  if (!token) return;

  const { email } = await Token.getUserInformation(token);

  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  const user = await userService.findByEmailOrThrow(email);

  return user;
}
