import { User } from '@/models/user.model';
import { EmptyResponse, PaginatedResponse } from './main.response';

export type CreateUserResponse = Omit<User, 'password'>;
export type EditUserResponse = CreateUserResponse;
export type DeleteUserResponse = EmptyResponse;

export type GetUsersResponseListItem = Omit<User, 'password' | 'deletedAt' | 'permissions'>;
export type GetUsersResponse = PaginatedResponse<GetUsersResponseListItem>;

export type GetUserResponse = GetUsersResponseListItem;

export type SetUserImageResponse = EmptyResponse;
export type SetUserLanguageResponse = EmptyResponse;
export type SetUserModeResponse = EmptyResponse;

export type AdminResetPasswordResponse = EmptyResponse;

export type GetUsersDropdownListResponse = {
  id: number;
  name: string;
}[];
