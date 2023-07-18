import { EditCustomerRequest, CreateCustomerRequest } from '@/requests/customers.request';
import { ActiveQuery, Authenticable, FromToDateQuery, Identifiable, PaginationQuery, SearchQuery } from './main.dto';

export type CreateCustomerDto = Authenticable<CreateCustomerRequest>;
export type EditCustomerDto = Authenticable<Identifiable & EditCustomerRequest>;
export type DeleteCustomerDto = Authenticable<Identifiable>;
export type GetCustomersDto = PaginationQuery & SearchQuery & ActiveQuery;
export type GetCustomerDto = Identifiable;
export type GetCustomerRunningBalanceDto = PaginationQuery & Identifiable & FromToDateQuery;
export type GetCustomersDropdownListDto = void;
