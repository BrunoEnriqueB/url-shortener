import {
  UserAlreadyExistsError,
  UserNotFoundError
} from '@/domain/errors/user';
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

  describe('findByEmailOrThrow', () => {
    const mockEmail = 'test@example.com';
    const mockUser = {
      id: 1,
      email: mockEmail,
      password: 'hashedpassword',
      created_at: new Date(),
      updated_at: new Date()
    };

    it('should return a user when found', async () => {
      (User.query().where as jest.Mock).mockReturnValue({
        first: jest.fn().mockResolvedValue(mockUser)
      });

      const result = await userRepository.findByEmailOrThrow(mockEmail);
      expect(result).toEqual(mockUser);
    });

    it('should throw UserNotFoundError when user is not found', async () => {
      (User.query().where as jest.Mock).mockReturnValue({
        first: jest.fn().mockResolvedValue(null)
      });

      await expect(
        userRepository.findByEmailOrThrow(mockEmail)
      ).rejects.toThrow(UserNotFoundError);
    });

    it('should call User.query() with correct email', async () => {
      (User.query().where as jest.Mock).mockReturnValue({
        first: jest.fn().mockResolvedValue(mockUser)
      });

      await userRepository.findByEmailOrThrow(mockEmail);
      expect(User.query().where).toHaveBeenCalledWith({ email: mockEmail });
    });
  });
});
