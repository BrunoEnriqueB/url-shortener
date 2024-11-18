import env from '@/config/environment';
import { UnauthorizedError } from '@/domain/errors/http';
import { TokenUserDTO, TTokenUserDTO } from '@/dtos/user/token.dto';
import Token from '@/libs/jwt.libs';
import jwt from 'jsonwebtoken';

// Mock external dependencies
jest.mock('jsonwebtoken');
jest.mock('@/dtos/user/token.dto');

describe('Token Class', () => {
  describe('createToken', () => {
    it('should create a valid token for a given user id', async () => {
      const mockUserInformation: TTokenUserDTO = {
        email: 'johndoe@example.com',
        id: 1
      };
      const mockToken = 'mockJwtToken';

      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = await Token.createToken(mockUserInformation);
      expect(jwt.sign).toHaveBeenCalledWith(mockUserInformation, env.SECRET);
      expect(token).toBe(mockToken);
    });
  });

  describe('getUserInformation', () => {
    it('should return user information for a valid token', async () => {
      const mockToken = 'validJwtToken';
      const mockUserPayload = { id: 'user123' };
      const mockUserInformation = { success: true, data: mockUserPayload };

      (jwt.verify as jest.Mock).mockReturnValue(mockUserPayload);

      (TokenUserDTO.safeParse as jest.Mock).mockReturnValue(
        mockUserInformation
      );

      const userInfo = await Token.getUserInformation(mockToken);
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, env.SECRET);
      expect(userInfo).toEqual(mockUserPayload);
    });

    it('should throw UnauthorizedError if token is invalid', async () => {
      const mockToken = 'invalidJwtToken';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new jwt.JsonWebTokenError('invalid token');
      });

      await expect(Token.getUserInformation(mockToken)).rejects.toThrow(
        UnauthorizedError
      );
    });

    it('should throw UnauthorizedError if token payload fails validation', async () => {
      const mockToken = 'validJwtToken';
      const mockUserPayload = { id: 'user123' };
      const mockUserInformation = { success: false, error: 'Invalid payload' };

      (jwt.verify as jest.Mock).mockReturnValue(mockUserPayload);

      (TokenUserDTO.safeParse as jest.Mock).mockReturnValue(
        mockUserInformation
      );

      await expect(Token.getUserInformation(mockToken)).rejects.toThrow(
        UnauthorizedError
      );
    });
  });
});
