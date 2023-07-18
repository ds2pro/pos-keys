import { ActiveQuery, AuthenticatedUser, FromToDateQuery, PaginationQuery, SearchQuery } from '@/dtos/main.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateCustomerRequest, EditCustomerRequest } from '@/requests/customers.request';
import { DeleteCustomerResponse } from '@/response/customers.response';
import CustomersService from '@/services/customers.service';
import { getBooleanValue } from '@/utils/util';
import { Response, NextFunction } from 'express';

class CustomersController {
  private customersService = new CustomersService();

  public createCustomer = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateCustomerRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.customersService.createCustomer({
        __by: user,
        ...body,
      });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  public editCustomer = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const body: EditCustomerRequest = req.body;
      const user: AuthenticatedUser = req.user;
      const result = await this.customersService.editCustomer({
        id: Number(id),
        __by: user,
        ...body,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public deleteCustomer = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user: AuthenticatedUser = req.user;
      const result = await this.customersService.deleteCustomer({
        id: Number(id),
        __by: req.user,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getCustomers = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { isActive }: ActiveQuery = req.query;
      const pagination: PaginationQuery = req.query;
      const search: SearchQuery = req.query;
      const result = await this.customersService.getCustomers({
        isActive: getBooleanValue(isActive),
        limit: pagination.limit ? Number(pagination.limit) : 20,
        offset: pagination.offset ? Number(pagination.offset) : 0,
        ...search,
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getCustomer = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.customersService.getCustomer({
        id: Number(id),
      });
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getCustomersDropdown = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.customersService.getCustomersDropdown();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new CustomersController();
