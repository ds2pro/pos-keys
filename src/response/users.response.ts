import { User } from '@/models/user.model';
import { EmptyResponse, MessageResponse, PaginatedResponse } from './main.response';
import { Identifiable } from '@/dtos/main.dto';

export type CreateUserResponse = Identifiable & MessageResponse;
export type EditUserResponse = MessageResponse;
export type DeleteUserResponse = MessageResponse;

export type GetUsersResponseListItem = Omit<User, 'password' | 'deletedAt' | 'permissions'>;
export type GetUsersResponse = PaginatedResponse<GetUsersResponseListItem>;

export type GetUserResponse = GetUsersResponseListItem;

export type SetUserImageResponse = MessageResponse;
export type SetUserLanguageResponse = MessageResponse;
export type SetUserModeResponse = MessageResponse;

export type AdminResetPasswordResponse = MessageResponse;

export type GetUsersDropdownListResponse = {
  id: number;
  name: string;
}[];
