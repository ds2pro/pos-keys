import { User } from '@models/user.model';

export type AuthenticatedUser = Pick<User, 'id' | 'role' | 'permissions' | 'userName'>;

export type BundledAuthenticatedUser = {
  __by: AuthenticatedUser;
};

export type Authenticable<T> = BundledAuthenticatedUser & T;

export type OmitTimestamps<T> = Omit<T, 'createdDate' | 'updatedDate' | 'deletedDate'>;

export type OmitPassword<T> = Omit<T, 'password'>;
export type Id = number;
export type Identifiable = { id: Id };
export type KeyValue = { key: string; value: string };
export type IncludeTimestamps<T> = T & {
  createdDate: number;
  updatedDate?: number;
};

export type PaginationQuery = {
  limit?: number;
  offset?: number;
};
export type SearchQuery = {
  q?: string;
};
export type OpenQuery = {
  openDateFrom?: string;
  openDateTo?: string;
};
export type CloseQuery = {
  closeDateFrom?: string;
  closeDateTo?: string;
};
export type SecretQuery = {
  secret?: string;
};
export type ActiveQuery = {
  isActive?: boolean;
};

type TimePeriodQueryType = 'week' | 'month' | 'year';

export type TimePeriodQuery = {
  last?: TimePeriodQueryType;
};

export type FromToDateQuery = {
  from?: string;
  to?: string;
};

export type DayDateQuery = {
  day?: string;
};
/***
 * dropdowns csv. For instance, category,currency
 */
export type DropdownDataQuery = {
  name?: string;
};
