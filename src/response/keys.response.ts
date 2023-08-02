import { Identifiable, IncludeTimestamps } from '@/dtos/main.dto';
import { CreatedByUser, Customer } from '@/models/base.model';
import { PaginatedResponse } from './main.response';

export type CreateKeyResponse = Identifiable & {
  customer: Customer;
  key: string;
  period: number;
  expiryDate: number;
};

export type GetKeysListItem = IncludeTimestamps<{
  id: number;
  guid: string;
  key: string;
  period: number;
  generatedDate: number;
  activatedDate: number;
  expiryDate: number;
  customer: Customer;
}>;

export type GetKeysResponse = PaginatedResponse<GetKeysListItem>;

export type ActivateKeyResponse = {
  id: number;
  key: string;
  period: number;
  activatedDate: number;
  expiryDate: number;
  customer: Customer;
  currentTimestamp: number;
};
