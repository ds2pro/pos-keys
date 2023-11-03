import { Identifiable, IncludeTimestamps } from '@/dtos/main.dto';
import { EmptyResponse, MessageResponse, PaginatedResponse } from './main.response';

export type CreateCustomerResponse = Identifiable & MessageResponse;
export type EditCustomerResponse = MessageResponse;
export type DeleteCustomerResponse = MessageResponse;

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
