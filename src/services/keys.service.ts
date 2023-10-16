import { customers } from '@/database/models/customers';
import { tblKeys } from '@/database/models/tblKeys';
import { ActivateKeyDto, CreateKeyDto, DeactivateKeyDto, GetKeysDto } from '@/dtos/keys.dto';
import { HttpException } from '@/exceptions/HttpException';
import s from '@/init-sequelize';
import { DeactivateKeyRequest } from '@/requests/keys.request';
import { ActivateKeyResponse, CreateKeyResponse, DeactivateKeyResponse, GetKeysListItem, GetKeysResponse } from '@/response/keys.response';
import { EmptyResponse } from '@/response/main.response';
import { createUserLog } from '@/utils/user.util';
import {
  calculateDateAfterDays,
  calculatePaginationFields,
  getSearchFieldsConds,
  getSearchFieldsCondsForeign,
  removeHyphens,
  separateKeyEveryNChars,
  toTimestamp,
} from '@/utils/util';
import moment from 'moment';
import { Op } from 'sequelize';

interface IKeysService {
  createKey(dto: CreateKeyDto): Promise<CreateKeyResponse>;
  getKeys(dto: GetKeysDto): Promise<GetKeysResponse>;
  activateKey(dto: ActivateKeyDto): Promise<ActivateKeyResponse>;
  deactivateKey(dto: DeactivateKeyDto): Promise<DeactivateKeyResponse>;
}
class KeysService implements IKeysService {
  async generateLicenseKey(): Promise<string> {
    const generateOneLicenseKey = (length: number): string => {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let licenseKey = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        licenseKey += charset.charAt(randomIndex);
      }

      return licenseKey;
    };
    const licenseKeyLength = 25;
    let licenseKey: string;
    const maxAttempts = 5;

    for (let i = 0; i < maxAttempts; i++) {
      licenseKey = generateOneLicenseKey(licenseKeyLength);
      const found = await tblKeys.findOne({
        where: {
          key: licenseKey,
        },
      });
      if (!found) {
        break;
      }
      licenseKey = null;
    }
    if (!licenseKey) {
      throw new HttpException(400, 'Could not generate unique key');
    }
    return licenseKey;
  }

  async createKey(dto: CreateKeyDto): Promise<CreateKeyResponse> {
    const t = await s.transaction();
    try {
      let customer: customers;
      if (dto.customerId) {
        customer = await customers.findByPk(dto.customerId);
        if (!customer) {
          throw new HttpException(404, 'Customer not found');
        }
      }

      const expiryDate = dto.period > 0 ? calculateDateAfterDays(dto.period) : null;

      const key = await tblKeys.create(
        {
          key: await this.generateLicenseKey(),
          customerId: dto.customerId,
          period: dto.period,
          generatedDate: new Date(),
          expiryDate: expiryDate,
          createdBy: dto.__by.id,
        },
        {
          transaction: t,
        },
      );

      await createUserLog(dto.__by.id, 'Create Key', `User created key with id: ${key.id}`, t);
      await t.commit();

      return {
        id: key.id,
        key: separateKeyEveryNChars(key.key),
        customer: dto.customerId
          ? {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              mobile: customer.mobile,
            }
          : null,
        period: dto.period,
        expiryDate: toTimestamp(expiryDate),
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async getKeys(dto: GetKeysDto): Promise<GetKeysResponse> {
    const keysCond: any = {};

    if (dto.isActive === false) {
      keysCond.activatedDate = {
        [Op.is]: null,
      };
    } else if (dto.isActive === true) {
      keysCond.activatedDate = {
        [Op.not]: null,
      };
    }

    if (dto.key) {
      keysCond.key = {
        [Op.like]: `%${removeHyphens(dto.key)}%`,
      };
    }

    if (dto.customer) {
      const customerSearch = getSearchFieldsCondsForeign('customer', dto.customer, ['name', 'email', 'phone', 'mobile']);
      keysCond[Op.or] = customerSearch;
    }
    const keys = await tblKeys.findAll({
      offset: Number(dto.offset),
      limit: Number(dto.limit),
      where: keysCond,
      include: [
        {
          model: customers,
          as: 'customer',
        },
      ],
      order: [['createdDate', 'DESC']],
    });

    const data: GetKeysListItem[] = keys.map(key => {
      return {
        id: key.id,
        guid: key.guid,
        customer: key.customer
          ? {
              id: key.customer.id,
              name: key.customer.name,
              email: key.customer.email,
              phone: key.customer.phone,
              mobile: key.customer.mobile,
            }
          : null,
        key: separateKeyEveryNChars(key.key),
        period: key.period,
        generatedDate: toTimestamp(key.generatedDate),
        activatedDate: key.activatedDate ? toTimestamp(key.activatedDate) : null,
        expiryDate: key.expiryDate ? toTimestamp(key.expiryDate) : null,
        createdDate: toTimestamp(key.createdDate),
        updatedDate: toTimestamp(key.updatedDate),
      };
    });

    const count = await tblKeys.count({
      where: keysCond,
      include: [
        {
          model: customers,
          as: 'customer',
        },
      ],
    });

    const [hasMore] = calculatePaginationFields(count, data.length, Number(dto.offset), Number(dto.limit));
    return {
      total: count,
      hasMore: hasMore,
      size: data.length,
      data: data,
    };
  }

  async activateKey(dto: ActivateKeyDto): Promise<ActivateKeyResponse> {
    const t = await s.transaction();
    try {
      const key = await tblKeys.findOne({
        where: {
          key: removeHyphens(dto.key),
          activatedDate: { [Op.is]: null },
        },
        include: [
          {
            model: customers,
            as: 'customer',
          },
        ],
      });
      if (!key) {
        throw new HttpException(404, 'Invalid Key');
      }
      key.activatedDate = new Date();
      await key.save();
      await createUserLog(null, 'Activate Key', `User created key with id: ${key.id}`, t);
      await t.commit();

      return {
        id: key.id,
        key: separateKeyEveryNChars(key.key),
        customer: key.customer
          ? {
              id: key.customer.id,
              name: key.customer.name,
              email: key.customer.email,
              phone: key.customer.phone,
              mobile: key.customer.mobile,
            }
          : null,
        period: key.period,
        activatedDate: toTimestamp(key.activatedDate),
        expiryDate: toTimestamp(key.expiryDate),
        currentTimestamp: moment().unix(),
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async deactivateKey(dto: DeactivateKeyRequest): Promise<EmptyResponse> {
    const t = await s.transaction();
    try {
      const key = await tblKeys.findOne({
        where: {
          key: removeHyphens(dto.key),
          activatedDate: { [Op.not]: null },
        },
      });
      if (!key) {
        throw new HttpException(404, 'Invalid Key');
      }
      key.expiryDate = new Date();
      await key.save();
      await createUserLog(null, 'Deactivate Key', `User deactivated a key with id: ${key.id}`, t);
      await t.commit();
      return {}
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
}

export default KeysService;
