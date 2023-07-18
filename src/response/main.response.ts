export type EmptyResponse = {};
export interface PaginatedResponse<T> {
  hasMore?: boolean;
  total: number;
  size: number;
  data: T[];
}
