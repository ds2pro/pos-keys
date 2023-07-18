import { ActiveQuery, AuthenticatedUser, PaginationQuery, SearchQuery } from '@/dtos/main.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import {
  AdminResetPasswordRequest,
  CreateUserRequest,
  EditUserRequest,
  SetUserImageRequest,
  SetUserLanguageRequest,
  SetUserModeRequest,
} from '@/requests/users.request';
import UsersService from '@/services/users.service';
import { getBooleanValue } from '@/utils/util';
import { Response, NextFunction } from 'express';

class UsersController {
  private usersService = new UsersService();

  public createUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateUserRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.createUser({
        __by: user,
        ...body,
      });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  public editUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const body: EditUserRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.editUser({
        id: Number(id),
        __by: user,
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.deleteUser({
        id: Number(id),
        __by: user,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getUsers = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: AuthenticatedUser = req.user;
      const pagination: PaginationQuery = req.query;
      const search: SearchQuery = req.query;
      const { isActive }: ActiveQuery = req.query;
      const users = await this.usersService.getUsers({
        __by: user,
        limit: pagination.limit ? Number(pagination.limit) : 20,
        offset: pagination.offset ? Number(pagination.offset) : 0,
        ...search,
        isActive: getBooleanValue(isActive),
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.usersService.getUser({
        id: Number(id),
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public setUserImage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: SetUserImageRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.setUserImage({
        __by: user,
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public setUserLanguage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: SetUserLanguageRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.setUserLanguage({
        __by: user,
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public setUserMode = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: SetUserModeRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.setUserMode({
        __by: user,
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public adminResetPassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const body: AdminResetPasswordRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.usersService.adminResetPassword({
        id: Number(id),
        __by: user,
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getUsersDropdownList = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.usersService.getUsersDropdownList();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new UsersController();
