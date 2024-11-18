import crypto from 'node:crypto';

export default function hashOriginalUrl(originalUrl: string): string {
  const randomSuffix = crypto
    .randomBytes(3)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 3);
  return crypto
    .createHash('sha256')
    .update(originalUrl + randomSuffix)
    .digest('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 6);
}
