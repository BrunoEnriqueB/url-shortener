import env from '@/config/environment';
import hashOriginalUrl from '@/utils/hash-url.util';

describe('Hash Url Function', () => {
  it(`should generate a ${env.MAX_LENGTH_OF_URL}-character hash`, () => {
    const originalUrl = 'https://example.com';
    const hash = hashOriginalUrl(originalUrl);
    expect(hash).toHaveLength(env.MAX_LENGTH_OF_URL);
  });

  it('should generate different hashes for the same URL', () => {
    const originalUrl = 'https://example.com';
    const hash1 = hashOriginalUrl(originalUrl);
    const hash2 = hashOriginalUrl(originalUrl);
    expect(hash1).not.toEqual(hash2);
  });

  it('should generate different hashes for different URLs', () => {
    const url1 = 'https://example.com';
    const url2 = 'https://another-example.com';
    const hash1 = hashOriginalUrl(url1);
    const hash2 = hashOriginalUrl(url2);
    expect(hash1).not.toEqual(hash2);
  });
});
