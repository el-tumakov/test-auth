import crypto from 'crypto';

export const randomString = (size: number) => {
  const bSize = Math.ceil(size / 2);
  const bytes = crypto.randomBytes(bSize);

  return bytes.toString('hex').substring(0, size);
};
