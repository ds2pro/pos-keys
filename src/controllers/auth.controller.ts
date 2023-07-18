import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import { CheckAdminRequest, LoginRequest } from '@/requests/auth.request';
import { RequestWithUser } from '@/interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: LoginRequest = req.body;
      const response = await this.authService.login(dto);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getPermissions = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;
      const result = await this.authService.getPermissions({
        __by: user,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  public heartbeat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  public checkAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CheckAdminRequest = req.body;
      const response = await this.authService.checkAdmin(dto);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
