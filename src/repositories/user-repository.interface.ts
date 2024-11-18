import { TCreateUserDTO } from '@/dtos/user/create.dto';
import User from '@/models/user.model';

interface UserRepositoryInterface {
  createUser(userDTO: TCreateUserDTO): Promise<User>;
}

export default UserRepositoryInterface;
