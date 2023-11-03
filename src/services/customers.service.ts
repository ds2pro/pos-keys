import { customers } from '@/database/models/customers';
import {
  CreateCustomerDto,
  DeleteCustomerDto,
  EditCustomerDto,
  GetCustomerDto,
  GetCustomerRunningBalanceDto,
  GetCustomersDropdownListDto,
  GetCustomersDto,
} from '@/dtos/customers.dto';
import { Identifiable } from '@/dtos/main.dto';
import { HttpException } from '@/exceptions/HttpException';
import {
  CreateCustomerResponse,
  DeleteCustomerResponse,
  EditCustomerResponse,
  GetCustomerResponse,
  GetCustomersDropdownListResponse,
  GetCustomersListCustomer,
  GetCustomersResponse,
} from '@/response/customers.response';
import s from '@/init-sequelize';
import { createUserLog } from '@/utils/user.util';
import { DateTimeConversion, calculatePaginationFields, getSearchFieldsConds, toStringDateConversion, toTimestamp } from '@/utils/util';
import moment from 'moment';

interface ICustomersService {
  createCustomer(dto: CreateCustomerDto): Promise<CreateCustomerResponse>;
  editCustomer(dto: EditCustomerDto): Promise<EditCustomerResponse>;
  deleteCustomer(dto: DeleteCustomerDto): Promise<DeleteCustomerResponse>;
  getCustomers(dto: GetCustomersDto): Promise<GetCustomersResponse>;
  getCustomer(dto: GetCustomerDto): Promise<GetCustomerResponse>;
  getCustomersDropdown(dto: GetCustomersDropdownListDto): Promise<GetCustomersDropdownListResponse>;
}
class CustomersService implements ICustomersService {
  async createCustomer(dto: CreateCustomerDto): Promise<CreateCustomerResponse> {
    const t = await s.transaction();
    try {
      const customer = await customers.create(
        {
          name: dto.name,
          abbreviation: dto.abbreviation,
          phone: dto.phone,
          mobile: dto.mobile,
          email: dto.email,
          createdById: dto.__by.id,
          isActive: dto.isActive,
        },
        {
          transaction: t,
        },
      );

      await createUserLog(dto.__by.id, 'Create Customer', `User created customer with id: ${customer.id}`, t);
      await t.commit();

      return {
        id: customer.id,
        message: 'Customer created successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async editCustomer(dto: EditCustomerDto): Promise<EditCustomerResponse> {
    const t = await s.transaction();
    try {
      const customerFound = await customers.findByPk(dto.id);
      if (!customerFound) {
        throw new HttpException(404, 'Customer not found');
      }

      await customers.update(
        {
          name: dto.name,
          abbreviation: dto.abbreviation,
          phone: dto.phone,
          mobile: dto.mobile,
          email: dto.email,
          updatedById: dto.__by.id,
          isActive: dto.isActive,
        },
        {
          where: {
            id: dto.id,
          },
          transaction: t,
        },
      );

      await createUserLog(dto.__by.id, 'Update Customer', `User updated customer with id: ${dto.id}`, t);
      await t.commit();
      const customer = await customers.findByPk(dto.id);
      return {
        message: 'Customer updated successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  async deleteCustomer(dto: DeleteCustomerDto): Promise<DeleteCustomerResponse> {
    const t = await s.transaction();
    try {
      const found = await customers.findByPk(dto.id);
      if (!found) {
        throw new HttpException(400, 'Customer not found');
      }
      await customers.destroy({
        where: {
          id: dto.id,
        },
        transaction: t,
        force: true,
      });
      await createUserLog(dto.__by.id, 'Delete Customer', `User deleted customer with id: ${dto.id}`, t);
      await t.commit();
      return {
        message: 'Customer deleted successfully',
      };
    } catch (e) {
      await t.rollback();
      if (e.name === 'SequelizeForeignKeyConstraintError') {
        throw new HttpException(400, 'This customer cannot be deleted due to a reference constraint.');
      }
      throw e;
    }
  }
  async getCustomers(dto: GetCustomersDto): Promise<GetCustomersResponse> {
    const searchableFields = getSearchFieldsConds(dto.q, ['name', 'abbreviation', 'phone', 'mobile', 'email', 'guid']);
    const cond = {
      ...searchableFields,
    };

    if (dto.isActive !== null) {
      cond.isActive = dto.isActive;
    }

    const cts = await customers.findAll({
      offset: Number(dto.offset),
      limit: Number(dto.limit),
      where: {
        ...cond,
      },
      order: [['name', 'ASC']],
    });

    const data: GetCustomersListCustomer[] = cts.map(cust => {
      return {
        id: cust.id,
        guid: cust.guid,
        name: cust.name,
        abbreviation: cust.abbreviation,
        phone: cust.phone,
        mobile: cust.mobile,
        email: cust.email,
        isActive: cust.isActive,
      };
    });

    const count = await customers.count({
      where: {
        ...cond,
      },
    });

    const [hasMore] = calculatePaginationFields(count, data.length, Number(dto.offset), Number(dto.limit));
    return {
      total: count,
      hasMore: hasMore,
      size: data.length,
      data: data,
    };
  }
  async getCustomer(dto: Identifiable): Promise<GetCustomerResponse> {
    const cust = await customers.findByPk(dto.id);
    if (!cust) {
      throw new HttpException(404, 'Customer not found');
    }
    return {
      id: cust.id,
      guid: cust.guid,
      name: cust.name,
      abbreviation: cust.abbreviation,
      phone: cust.phone,
      mobile: cust.mobile,
      email: cust.email,
      isActive: cust.isActive,
      createdDate: toTimestamp(cust.createdDate),
      updatedDate: toTimestamp(cust.updatedDate),
    };
  }

  async getCustomersDropdown(dto: void): Promise<GetCustomersDropdownListResponse> {
    const custs = await customers.findAll({
      order: [['name', 'ASC']],
    });
    return custs.map(cust => {
      return {
        id: cust.id,
        name: cust.isActive ? cust.name : cust.name + ' (inActive)',
        isActive: cust.isActive,
      };
    });
  }
}

export default CustomersService;
