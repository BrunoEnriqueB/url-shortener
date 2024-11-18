import randomShortUrl from '@/utils/random-short-url.utils';

describe('RandomShortUrl function', () => {
  it('should return a string of 6 characters by default', () => {
    const result = randomShortUrl();
    expect(result).toHaveLength(6);
  });

  it('should return a string of specified length', () => {
    const length = 10;
    const result = randomShortUrl(length);
    expect(result).toHaveLength(length);
  });

  it('should only contain alphabetic characters', () => {
    const result = randomShortUrl(1000);
    expect(result).toMatch(/^[A-Za-z]+$/);
  });

  it('should return different results on subsequent calls', () => {
    const result1 = randomShortUrl();
    const result2 = randomShortUrl();
    expect(result1).not.toEqual(result2);
  });
});
