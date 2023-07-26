import { ActivateKeyRequest, CreateKeyRequest } from '@/requests/keys.request';
import { ActiveQuery, Authenticable, PaginationQuery, SearchQuery } from './main.dto';

export type CreateKeyDto = Authenticable<CreateKeyRequest>;
export type GetKeysDto = PaginationQuery & ActiveQuery & { key?: string } & { customer?: string };
export type GetKeysQuery = {
  key?: string;
  customer?: string;
};

export type ActivateKeyDto = ActivateKeyRequest;
