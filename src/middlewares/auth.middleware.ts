import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser, TokenData } from '@interfaces/auth.interface';
import { AuthenticatedUser } from '@dtos/main.dto';
import { createToken } from '@utils/jwt.util';
import { getUserBy } from '@/utils/user.util';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (!authorization) {
      return next(new HttpException(401, 'Authentication failed'));
    }
    const verificationResponse = (await verify(authorization, SECRET_KEY)) as DataStoredInToken;
    const userId = verificationResponse.id;
    const user: AuthenticatedUser = await getUserBy({ id: userId });
    if (!user) {
      return next(new HttpException(401, 'Authentication token missing'));
    }
    req.user = user;
    const token: TokenData = {
      ...createToken({
        id: user.id,
        role: user.role.name,
      }),
    };
    res.setHeader('X-Access-Token', token.accessToken);
    next();
  } catch (error) {
    const code = 'auth_failed';
    let message: string = error?.message;
    if (message === 'jwt expired') {
      message = 'Your token has expired';
    }
    next(new HttpException(401, message, code));
  }
};

export default authMiddleware;
