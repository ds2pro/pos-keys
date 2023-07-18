import { Request } from 'express';
import { AuthenticatedUser } from '@dtos/main.dto';

export interface TokenData {
  accessToken: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

export interface DataStoredInToken {
  id: number;
}

export interface RequestWithBooleanQs extends Request {
  query: any | boolean;
}
