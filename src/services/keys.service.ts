import { customers } from '@/database/models/customers';
import { tblKeys } from '@/database/models/tblKeys';
import { ActivateKeyDto, CreateKeyDto, DeactivateKeyDto, GetEncryptedKeyDto, GetKeyDto, GetKeysDto } from '@/dtos/keys.dto';
import { HttpException } from '@/exceptions/HttpException';
import s from '@/init-sequelize';
import { DeactivateKeyRequest } from '@/requests/keys.request';
import {
  ActivateKeyResponse,
  CreateKeyResponse,
  DeactivateKeyResponse,
  GetEncryptedKeyResponse,
  GetKeyResponse,
  GetKeysListItem,
  GetKeysResponse,
} from '@/response/keys.response';
import { EmptyResponse, MessageResponse } from '@/response/main.response';
import { createUserLog } from '@/utils/user.util';
import {
  calculateDateAfterDays,
  calculateExpiryDate,
  calculatePaginationFields,
  getSearchFieldsConds,
  getSearchFieldsCondsForeign,
  removeHyphens,
  separateKeyEveryNChars,
  toTimestamp,
} from '@/utils/util';
import moment from 'moment';
import { Op } from 'sequelize';
import UtilsService from './util.service';

interface IKeysService {
  createKey(dto: CreateKeyDto): Promise<CreateKeyResponse>;
  getKeys(dto: GetKeysDto): Promise<GetKeysResponse>;
  getKey(dto: GetKeyDto): Promise<GetKeyResponse>;
  activateKey(dto: ActivateKeyDto): Promise<ActivateKeyResponse>;
  deactivateKey(dto: DeactivateKeyDto): Promise<DeactivateKeyResponse>;
  getEncryptedKey(dto: GetEncryptedKeyDto): Promise<GetEncryptedKeyResponse>;
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

      const expiryDate = dto.expiry > 0 ? calculateExpiryDate(dto.period) : null;

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
        key: separateKeyEveryNChars(key.key),
        message: 'Key created successfully',
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
        isDeactivated: key.isDeactivated,
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
  async getKey(dto: GetKeyDto): Promise<GetKeyResponse> {
    const key = await tblKeys.findOne({
      where: {
        key: removeHyphens(dto.key),
      },
      include: [
        {
          model: customers,
          as: 'customer',
        },
      ],
      order: [['createdDate', 'DESC']],
    });
    if (!key) {
      throw new HttpException(404, 'Key not found');
    }

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
      isDeactivated: key.isDeactivated,
      createdDate: toTimestamp(key.createdDate),
      updatedDate: toTimestamp(key.updatedDate),
    };
  }
  async activateKey(dto: ActivateKeyDto): Promise<ActivateKeyResponse> {
    const t = await s.transaction();
    try {
      const key = await tblKeys.findOne({
        where: {
          key: removeHyphens(dto.key),
        },
        include: [
          {
            model: customers,
            as: 'customer',
          },
        ],
      });
      if (!key) {
        throw new HttpException(404, 'Key not found');
      }else if (key.isDeactivated) {
        throw new HttpException(400, 'Key is deactivated');
      }else if (key.activatedDate) {
        throw new HttpException(400, 'Key has already been activated');
      } else if (key.expiryDate && key.expiryDate < new Date()) {
        throw new HttpException(400, 'Key is expired');
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
        message: 'Key activated successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async deactivateKey(dto: DeactivateKeyRequest): Promise<MessageResponse> {
    const t = await s.transaction();
    try {
      const key = await tblKeys.findOne({
        where: {
          key: removeHyphens(dto.key),
          activatedDate: { [Op.not]: null },
        },
      });
      if(key.isDeactivated){
         throw new HttpException(400, 'This key has already been deactivated');
      }
      if (!key) {
        throw new HttpException(404, 'Invalid Key');
      }
      key.isDeactivated = true;
      await key.save();
      await createUserLog(null, 'Deactivate Key', `User deactivated a key with id: ${key.id}`, t);
      await t.commit();
      return {
        message: 'Key deactivated successfully',
      };
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }

  async getEncryptedKey(dto: GetEncryptedKeyDto): Promise<GetEncryptedKeyResponse> {
    const utilService = new UtilsService();
    const key = await tblKeys.findOne({
      where: {
        key: removeHyphens(dto.licenseKey),
      },
    });
    if (!key) {
      throw new HttpException(404, 'Key not found');
    }

    return {
      customerId: key.customerId,
      key: key.key,
      encryptedPeriod: utilService.encryptText({
        key: dto.key,
        iv: dto.iv,
        text: String(key.period),
      }),
      encryptedExpiryDate:
        key.period === -1
          ? null
          : utilService.encryptText({
              key: dto.key,
              iv: dto.iv,
              text: String(toTimestamp(calculateDateAfterDays(key.period))),
            }),
      encryptedLastRequestDate: utilService.encryptText({
        key: dto.key,
        iv: dto.iv,
        text: String(moment().valueOf()),
      }),
    };
  }
}

export default KeysService;
