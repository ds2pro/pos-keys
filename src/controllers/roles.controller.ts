import RolesService from '@/services/roles.service';
import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AddUsersToRoleRequest, CreateRoleRequest, EditRoleRequest } from '@/requests/roles.request';
import { ActiveQuery, AuthenticatedUser, SearchQuery } from '@/dtos/main.dto';
import { getBooleanValue } from '@/utils/util';

class RolesController {
  private rolesService = new RolesService();

  public getInitialRolePermissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissions = await this.rolesService.getInitialRolePermissions();
      res.json(permissions);
    } catch (e) {
      next(e);
    }
  };

  public createRole = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateRoleRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.rolesService.createRole({
        __by: user,
        ...body,
      });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  public editRole = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: EditRoleRequest = req.body;
      const { id } = req.params;
      const user: AuthenticatedUser = req.user;
      const result = await this.rolesService.editRole({
        __by: user,
        id: Number(id),
        ...body,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  public deleteRole = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user: AuthenticatedUser = req.user;
      const result = await this.rolesService.deleteRole({
        __by: user,
        id: Number(id),
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { isActive }: ActiveQuery = req.query;
      const search: SearchQuery = req.query;
      const roles = await this.rolesService.getRoles({
        isActive: getBooleanValue(isActive),
        ...search,
      });
      res.json(roles);
    } catch (error) {
      next(error);
    }
  };

  public getRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const rolesPermissions = await this.rolesService.getRole({
        id: Number(id),
      });
      res.json(rolesPermissions);
    } catch (e) {
      next(e);
    }
  };

  public addUsersToRole = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const body: AddUsersToRoleRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.rolesService.addUsersToRole({
        id: Number(id),
        __by: user,
        ...body,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  public getUsersForRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.rolesService.getUsersForRole({
        id: Number(id),
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  public getRolesDropdown = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles = await this.rolesService.getRolesDropdown();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  };
}

export default new RolesController();
