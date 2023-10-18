import { TokenData } from '@interfaces/auth.interface';
import { SECRET_KEY } from '@config';
import { sign } from 'jsonwebtoken';

export const ACCESS_TOKEN_EXPIRY = 10 * 60;
export const REFRESH_TOKEN_EXPIRY = 7 * 24 * 3600;

export const createToken = (user: { id: number; role: string }): TokenData => {
  const secretKey: string = SECRET_KEY;
  const expiresIn: number = ACCESS_TOKEN_EXPIRY;
  return {
    expiresIn,
    accessToken: sign(user, secretKey, { expiresIn: expiresIn }),
  };
};
