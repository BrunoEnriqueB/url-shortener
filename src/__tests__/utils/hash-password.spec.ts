import { hashPassword, verifyPassword } from '@/utils/hash-password.utils';

describe('Hash Password Utils', () => {
  const password = 'securePassword123';
  let hashedPassword: string;

  beforeAll(async () => {
    // Generate a hashed password for testing purposes
    hashedPassword = await hashPassword(password);
  });

  it('should hash a password', async () => {
    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword).not.toBe(password);
  });

  it('should verify the password correctly', async () => {
    const isMatch = await verifyPassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const wrongPassword = 'wrongPassword123';
    const isMatch = await verifyPassword(wrongPassword, hashedPassword);
    expect(isMatch).toBe(false);
  });

  it('should hash the same password differently', async () => {
    const anotherHashedPassword = await hashPassword(password);
    expect(anotherHashedPassword).not.toBe(hashedPassword);
  });
});
