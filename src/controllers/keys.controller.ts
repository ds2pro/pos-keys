import { GetKeysQuery } from '@/dtos/keys.dto';
import { ActiveQuery, AuthenticatedUser, PaginationQuery, SearchQuery } from '@/dtos/main.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ActivateKeyRequest, CreateKeyRequest, DeactivateKeyRequest } from '@/requests/keys.request';
import KeysService from '@/services/keys.service';
import { Response, NextFunction } from 'express';

class KeysController {
  private keysService = new KeysService();

  public createKey = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateKeyRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.keysService.createKey({
        __by: user,
        ...body,
      });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getKeys = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { isActive }: ActiveQuery = req.query;
      const pagination: PaginationQuery = req.query;
      const keysQuery: GetKeysQuery = req.query;

      const result = await this.keysService.getKeys({
        isActive: isActive,
        limit: pagination.limit ? Number(pagination.limit) : 20,
        offset: pagination.offset ? Number(pagination.offset) : 0,
        key: keysQuery.key,
        customer: keysQuery.customer,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getKey = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { key } = req.params;
      const result = await this.keysService.getKey({
        key: key,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public activateKey = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: ActivateKeyRequest = req.body;
      const result = await this.keysService.activateKey({
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public deactivateKey = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: DeactivateKeyRequest = req.body;
      const result = await this.keysService.deactivateKey({
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new KeysController();
