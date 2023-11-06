import { Identifiable, IncludeTimestamps } from '@/dtos/main.dto';
import { CreatedByUser, Customer } from '@/models/base.model';
import { EmptyResponse, MessageResponse, PaginatedResponse } from './main.response';

export type CreateKeyResponse = {
  key: string;
  message: string
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
  isDeactivated: boolean;
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
  message: string;
};

export type GetKeyResponse = GetKeysListItem;
export type DeactivateKeyResponse = MessageResponse;

export type GetEncryptedKeyResponse = {
  customerId: number;
  key: string;
  encryptedPeriod: string;
  encryptedExpiryDate: string;
  encryptedLastRequestDate: string;
};
