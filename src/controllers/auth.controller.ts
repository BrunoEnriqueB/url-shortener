import { UnprocessableEntityError } from '@/domain/errors/http';
import { CreateUserDTO } from '@/dtos/user/create.dto';
import { SearchUserDTO } from '@/dtos/user/search.dto';
import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

export default class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserDto = CreateUserDTO.safeParse(req.body);

      if (!createUserDto.success) {
        throw new UnprocessableEntityError(createUserDto.error.errors);
      }

      await this.userService.createUser(createUserDto.data);
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async sigin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchUserDto = SearchUserDTO.safeParse(req.body);

      if (!searchUserDto.success) {
        throw new UnprocessableEntityError(searchUserDto.error.errors);
      }

      const token = await this.authService.auth(searchUserDto.data);
      res.status(200).json({ success: true, token });
    } catch (error) {
      next(error);
    }
  }
}
