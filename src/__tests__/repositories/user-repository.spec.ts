import { UserAlreadyExistsError } from '@/domain/errors/user';
import { TCreateUserDTO } from '@/dtos/user/create.dto';
import User from '@/models/user.model';
import UserRepository from '@/repositories/user.repository';

jest.mock('@/models/user.model');

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should throw UserAlreadyExistsError if a user with the same email already exists', async () => {
      const mockUserDTO: TCreateUserDTO = {
        email: 'test@example.com',
        password: 'password123'
      };

      User.query = jest.fn().mockReturnThis();
      User.query().where = jest.fn().mockResolvedValue([mockUserDTO]);

      await expect(userRepository.createUser(mockUserDTO)).rejects.toThrow(
        UserAlreadyExistsError
      );
      expect(User.query().where).toHaveBeenCalledTimes(1);
      expect(User.query().where).toHaveBeenCalledWith({
        email: mockUserDTO.email
      });
    });

    it('should create and return a new user if no user with the same email exists', async () => {
      const mockUserDTO: TCreateUserDTO = {
        email: 'test@example.com',
        password: 'password123'
      };
      const mockNewUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword123'
      };

      User.query = jest.fn().mockReturnThis();
      User.query().where = jest.fn().mockResolvedValue([]);
      User.query().insertAndFetch = jest.fn().mockResolvedValue(mockNewUser);

      const createdUser = await userRepository.createUser(mockUserDTO);
      expect(createdUser).toEqual(mockNewUser);
      expect(User.query().insertAndFetch).toHaveBeenCalledWith(mockUserDTO);
    });
  });
});
