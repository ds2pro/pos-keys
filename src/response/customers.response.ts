import { Identifiable, IncludeTimestamps } from '@/dtos/main.dto';
import { EmptyResponse, PaginatedResponse } from './main.response';
import { CreateCustomerRequest, EditCustomerRequest } from '@/requests/customers.request';
import { ContactType, Country, Currency, PaymentMode } from '@/models/base.model';

export type CreateCustomerResponse = Identifiable & CreateCustomerRequest;
export type EditCustomerResponse = Identifiable & EditCustomerRequest;
export type DeleteCustomerResponse = EmptyResponse;

export type GetCustomersListCustomer = {
  id: number;
  guid: string;
  name: string;
  abbreviation: string;
  phone: string;
  mobile: string;
  email: string;
  isActive: boolean;
};

export type GetCustomersResponse = PaginatedResponse<GetCustomersListCustomer>;
export type GetCustomerResponse = IncludeTimestamps<GetCustomersListCustomer>;

export type GetCustomersDropdownListResponse = {
  id: number;
  name: string;
  isActive: boolean;
}[];
