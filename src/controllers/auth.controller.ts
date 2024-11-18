import { UnprocessableEntityError } from '@/domain/errors/http';
import { CreateUserDTO } from '@/dtos/user/create.dto';
import UserService from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

export default class AuthController {
  constructor(private userService: UserService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserDto = CreateUserDTO.safeParse(req.body);

      if (!createUserDto.success) {
        throw new UnprocessableEntityError([createUserDto.error]);
      }

      await this.userService.createUser(createUserDto.data);
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
